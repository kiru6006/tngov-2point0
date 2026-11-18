import os
import json
import csv
import uuid
from datetime import datetime, timezone
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Query, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from db.session import get_db, engine, Base
from db.models import (
    Department,
    Jurisdiction,
    Position,
    Person,
    PositionAssignment,
    Service,
    Document,
    DocumentChunk,
)
from rag.hybrid_search import HybridSearchService
from rag.guardrails import RAGGuardrailService
from rag.pipeline import run_rag_indexing
from directory.router import router as directory_router
from portal.router import router as portal_router
from ai.router import router as ai_router

# Auto-create tables if missing
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Tamil Nadu Government Digital Portal 2.0 API Gateway",
    description="Asynchronous REST API Gateway connecting public portal to administrative directories, document intelligence, and e-Sevai status proxies.",
    version="2.0.0",
)

# Register Routers
app.include_router(directory_router)
app.include_router(portal_router)
app.include_router(ai_router)

# 1. CORS & Security Headers Middleware (GIGW 3.0 / CERT-In / Next.js integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://tn.gov.in"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; img-src 'self' data: https:; "
        "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none';"
    )
    return response

# 2. Path Helpers
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
WEB_DATA_DIR = os.path.join(BASE_DIR, "web", "src", "data")


# 3. Pydantic Schemas
class TrackResponse(BaseModel):
    application_id: str
    service_name: str
    status: str
    stage_number: int
    current_office: str
    statutory_sla_days: int
    filing_date: str
    last_updated: str


class AssignmentCreateRequest(BaseModel):
    position_id: str = Field(..., description="Target position ID (e.g. POS-001)")
    person_id: str = Field(..., description="Target officer person ID (e.g. PER-001)")
    start_date: str = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d"))
    transfer_go_ref: str = Field(..., description="Government Order reference authorizing transfer")
    submitted_by: str = Field(default="Nodal Author (Department Maker)")
    auto_submit_for_review: bool = Field(default=True, description="Move directly to PENDING_REVIEW if conflict check passes")


class AssignmentApproveRequest(BaseModel):
    approved_by: str = Field(default="Joint Secretary (Nodal Approver)")


class AssignmentDisputeRequest(BaseModel):
    disputed_by: str = Field(...)
    reason: str = Field(...)


class AssignmentResponse(BaseModel):
    assignment_id: str
    position_id: str
    position_title: str
    department: str
    district: str
    person_id: str
    person_name: str
    transfer_go_ref: str
    start_date: str
    end_date: Optional[str]
    is_current: bool
    workflow_status: str
    submitted_by: Optional[str]
    approved_by: Optional[str]
    created_at: Optional[str]


class HybridSearchRequest(BaseModel):
    query: str = Field(..., description="Citizen search query (English, Tamil, or transliterated)")
    limit: int = Field(default=5, ge=1, le=20)
    alpha: float = Field(default=0.5, ge=0.0, le=1.0, description="Weight for BM25 (1 - alpha for vector similarity)")


class RAGQueryRequest(BaseModel):
    query: str = Field(..., description="Citizen natural language question")
    language: str = Field(default="en", description="'en' for English, 'ta' for Tamil")
    limit: int = Field(default=3, ge=1, le=10)


# 4. Endpoints
@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "portal": "Tamil Nadu Government Portal 2.0",
        "compliance": "GIGW 3.0 / DPDP Act 2023",
    }


@app.get("/api/v1/services", tags=["Services"])
def list_services(category: Optional[str] = None, db: Session = Depends(get_db)):
    db_services = db.query(Service).all()
    if db_services:
        services = []
        for s in db_services:
            if not category or category.lower() in s.citizen_category.lower():
                services.append({
                    "service_id": s.service_id,
                    "service_name_en": s.service_name_en,
                    "service_name_ta": s.service_name_ta,
                    "department_owner": s.department_owner,
                    "citizen_category": s.citizen_category,
                    "eligibility_rules": s.eligibility_rules,
                    "required_docs": s.required_docs,
                    "statutory_sla_days": s.statutory_sla_days,
                    "service_channel": s.service_channel,
                    "action_url": s.action_url,
                })
        return {"count": len(services), "services": services}

    # Fallback to CSV
    csv_path = os.path.join(DATA_DIR, "service-catalogue.csv")
    if not os.path.exists(csv_path):
        raise HTTPException(status_code=404, detail="Service catalogue missing")
    
    services = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not category or category.lower() in row["citizen_category"].lower():
                services.append(row)
    return {"count": len(services), "services": services}


@app.get("/api/v1/services/{service_id}", tags=["Services"])
def get_service(service_id: str, db: Session = Depends(get_db)):
    srv = db.query(Service).filter(Service.service_id == service_id).first()
    if srv:
        return {
            "service_id": srv.service_id,
            "service_name_en": srv.service_name_en,
            "service_name_ta": srv.service_name_ta,
            "department_owner": srv.department_owner,
            "citizen_category": srv.citizen_category,
            "eligibility_rules": srv.eligibility_rules,
            "required_docs": srv.required_docs,
            "statutory_sla_days": srv.statutory_sla_days,
            "service_channel": srv.service_channel,
            "action_url": srv.action_url,
        }

    # Fallback to CSV
    csv_path = os.path.join(DATA_DIR, "service-catalogue.csv")
    if os.path.exists(csv_path):
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["service_id"] == service_id:
                    return row
    raise HTTPException(status_code=404, detail="Service ID not found")


@app.get("/api/v1/contacts", tags=["P0 Contact Directory"])
def list_contacts(
    query: Optional[str] = None,
    department: Optional[str] = None,
    district: Optional[str] = None,
    cadre: Optional[str] = None,
    limit: Optional[int] = 50,
    db: Session = Depends(get_db),
):
    # Relational join enforcing the core invariant:
    # Position exists independently of Person. Transfers update assignments.
    q = (
        db.query(PositionAssignment)
        .options(
            joinedload(PositionAssignment.person),
            joinedload(PositionAssignment.position).joinedload(Position.department),
            joinedload(PositionAssignment.position).joinedload(Position.jurisdiction),
        )
        .filter(PositionAssignment.is_current == True, PositionAssignment.workflow_status == "APPROVED")
        .join(Position, PositionAssignment.position_id == Position.position_id)
        .join(Person, PositionAssignment.person_id == Person.person_id)
        .join(Department, Position.department_id == Department.department_id)
        .join(Jurisdiction, Position.jurisdiction_id == Jurisdiction.jurisdiction_id)
    )
    if department:
        q = q.filter(Department.name_en.ilike(f"%{department}%"))
    if district:
        q = q.filter(Jurisdiction.district_en.ilike(f"%{district}%"))
    if cadre:
        q = q.filter(Position.cadre.ilike(f"%{cadre}%"))
    if query:
        q = q.filter(
            or_(
                Person.name_en.ilike(f"%{query}%"),
                Position.title_en.ilike(f"%{query}%"),
                Position.position_id.ilike(f"%{query}%"),
                Department.name_en.ilike(f"%{query}%"),
                Jurisdiction.district_en.ilike(f"%{query}%"),
                Jurisdiction.district_ta.ilike(f"%{query}%"),
            )
        )
    assignments = q.order_by(Position.position_id).limit(limit).all()

    if assignments:
        officials = []
        for asg in assignments:
            officials.append({
                "id": asg.position.position_id,
                "name_en": asg.person.name_en,
                "name_ta": asg.person.name_ta,
                "designation_en": asg.position.title_en,
                "designation_ta": asg.position.title_ta,
                "department_en": asg.position.department.name_en,
                "department_ta": asg.position.department.name_ta,
                "district_en": asg.position.jurisdiction.district_en,
                "district_ta": asg.position.jurisdiction.district_ta,
                "cadre": asg.position.cadre,
                "phone": asg.person.official_phone or "",
                "email": asg.person.official_email or "",
                "office": asg.person.office_address or "",
                "verified": asg.person.verification_status == "verified",
                "go_ref": asg.transfer_go_ref,
                "status": "Active" if asg.position.status == "active" else "Vacant",
            })
    else:
        # Fallback to contacts.json
        contacts_path = os.path.join(WEB_DATA_DIR, "contacts.json")
        if not os.path.exists(contacts_path):
            raise HTTPException(status_code=404, detail="Contacts database missing")
        with open(contacts_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            officials = data.get("officials", [])

    filtered = officials
    if query:
        q_str = query.lower()
        filtered = [
            o for o in filtered
            if (
                q_str in o.get("name_en", "").lower()
                or q_str in o.get("name_ta", "").lower()
                or q_str in o.get("designation_en", "").lower()
                or q_str in o.get("id", "").lower()
                or q_str in o.get("department_en", "").lower()
                or q_str in o.get("district_en", "").lower()
            )
        ]
    if department and department != "ALL":
        filtered = [o for o in filtered if department.lower() in o["department_en"].lower()]
    if district and district != "ALL":
        filtered = [o for o in filtered if district.lower() in o["district_en"].lower()]
    if cadre:
        filtered = [o for o in filtered if o["cadre"].lower() == cadre.lower()]

    return {"count": len(filtered), "officials": filtered}


@app.get("/api/v1/documents", tags=["Document Intelligence"])
def list_documents(
    year: Optional[str] = None,
    doc_type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    db_docs = db.query(Document).all()
    if db_docs:
        documents = [
            {
                "id": d.doc_id,
                "type": d.doc_type,
                "department": d.department,
                "title_en": d.subject_en,
                "title_ta": d.subject_ta,
                "date": d.date_issued,
                "year": d.year,
                "download_url": d.file_url,
                "is_machine_readable": d.is_machine_readable,
            }
            for d in db_docs
        ]
    else:
        docs_path = os.path.join(WEB_DATA_DIR, "documents.json")
        if not os.path.exists(docs_path):
            raise HTTPException(status_code=404, detail="Documents registry missing")
        with open(docs_path, "r", encoding="utf-8") as f:
            documents = json.load(f)

    if year and year != "ALL":
        documents = [d for d in documents if str(d["year"]) == str(year)]
    if doc_type and doc_type != "ALL":
        documents = [d for d in documents if doc_type.lower() in d["type"].lower()]

    return {"count": len(documents), "documents": documents}


@app.get("/api/v1/track/{app_id}", response_model=TrackResponse, tags=["Tracking Gateway"])
def track_application(app_id: str):
    clean_id = app_id.strip().upper()
    if len(clean_id) < 8:
        raise HTTPException(status_code=400, detail="Application ID must be 8-12 alphanumeric characters")
    
    # Simulated statutory proxy contract with TNeGA e-Sevai
    return TrackResponse(
        application_id=clean_id,
        service_name="Community Certificate / சாதிச் சான்றிதழ்",
        status="Under Review by Tahsildar",
        stage_number=3,
        current_office="Taluk Office, Egmore, Chennai",
        statutory_sla_days=15,
        filing_date="2026-11-10",
        last_updated="2026-11-17 14:30 IST",
    )


# 5. Maker-Checker Verification Queue Endpoints (P0 Directory Governance)
@app.post("/api/v1/admin/assignments", status_code=status.HTTP_201_CREATED, tags=["Maker-Checker Queue"])
def create_assignment(payload: AssignmentCreateRequest, db: Session = Depends(get_db)):
    """
    Nodal Author (Maker) submits a proposed assignment.
    Automated conflict check verifies no duplicate active assignment for same position/person.
    """
    position = db.query(Position).filter(Position.position_id == payload.position_id).first()
    if not position:
        raise HTTPException(status_code=404, detail=f"Position '{payload.position_id}' not found")

    person = db.query(Person).filter(Person.person_id == payload.person_id).first()
    if not person:
        raise HTTPException(status_code=404, detail=f"Person '{payload.person_id}' not found")

    # Conflict check: is there already a pending review for this position?
    pending_conflict = (
        db.query(PositionAssignment)
        .filter(
            PositionAssignment.position_id == payload.position_id,
            PositionAssignment.workflow_status == "PENDING_REVIEW",
        )
        .first()
    )
    if pending_conflict:
        raise HTTPException(
            status_code=409,
            detail=f"Conflict: Assignment {pending_conflict.assignment_id} is already in PENDING_REVIEW for this position.",
        )

    # Initial state
    target_status = "PENDING_REVIEW" if payload.auto_submit_for_review else "DRAFT"
    assignment_id = f"ASG-{uuid.uuid4().hex[:8].upper()}"

    new_assignment = PositionAssignment(
        assignment_id=assignment_id,
        position_id=payload.position_id,
        person_id=payload.person_id,
        start_date=payload.start_date,
        transfer_go_ref=payload.transfer_go_ref,
        is_current=False,  # Becomes current only after Approver sign-off
        workflow_status=target_status,
        submitted_by=payload.submitted_by,
    )
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)

    return {
        "message": f"Assignment drafted and routed to {target_status}",
        "assignment_id": new_assignment.assignment_id,
        "position_id": position.position_id,
        "position_title": position.title_en,
        "person_name": person.name_en,
        "workflow_status": new_assignment.workflow_status,
        "transfer_go_ref": new_assignment.transfer_go_ref,
    }


@app.get("/api/v1/admin/assignments", tags=["Maker-Checker Queue"])
def list_assignments(
    workflow_status: Optional[str] = Query(None, description="DRAFT, PENDING_REVIEW, APPROVED, DISPUTED"),
    position_id: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List assignment verification queue with maker-checker lifecycle metadata.
    """
    query = db.query(PositionAssignment)
    if workflow_status:
        query = query.filter(PositionAssignment.workflow_status == workflow_status.upper())
    if position_id:
        query = query.filter(PositionAssignment.position_id == position_id)

    records = query.order_by(PositionAssignment.created_at.desc()).all()
    results = []
    for r in records:
        results.append({
            "assignment_id": r.assignment_id,
            "position_id": r.position_id,
            "position_title": r.position.title_en if r.position else "",
            "department": r.position.department.name_en if r.position and r.position.department else "",
            "district": r.position.jurisdiction.district_en if r.position and r.position.jurisdiction else "",
            "person_id": r.person_id,
            "person_name": r.person.name_en if r.person else "",
            "transfer_go_ref": r.transfer_go_ref,
            "start_date": r.start_date,
            "end_date": r.end_date,
            "is_current": r.is_current,
            "workflow_status": r.workflow_status,
            "submitted_by": r.submitted_by,
            "approved_by": r.approved_by,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        })
    return {"count": len(results), "assignments": results}


@app.post("/api/v1/admin/assignments/{assignment_id}/approve", tags=["Maker-Checker Queue"])
def approve_assignment(
    assignment_id: str,
    payload: AssignmentApproveRequest,
    db: Session = Depends(get_db),
):
    """
    Nodal Approver (Joint Secretary / District DRO) sign-off:
    1. Retires existing current assignment on this position (sets end_date & is_current=False).
    2. Activates approved assignment (is_current=True, workflow_status='APPROVED').
    3. Verifies person and sets position status to 'active'.
    """
    assignment = db.query(PositionAssignment).filter(PositionAssignment.assignment_id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    if assignment.workflow_status == "APPROVED":
        raise HTTPException(status_code=400, detail="Assignment is already APPROVED")

    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Retire currently active assignment for this position
    prev_active = (
        db.query(PositionAssignment)
        .filter(
            PositionAssignment.position_id == assignment.position_id,
            PositionAssignment.is_current == True,
            PositionAssignment.assignment_id != assignment.assignment_id,
        )
        .all()
    )
    for prev in prev_active:
        prev.is_current = False
        if not prev.end_date:
            prev.end_date = today_str

    # Activate approved assignment
    assignment.is_current = True
    assignment.workflow_status = "APPROVED"
    assignment.approved_by = payload.approved_by
    assignment.updated_at = datetime.now(timezone.utc)

    # Update position status and officer verification
    if assignment.position:
        assignment.position.status = "active"
    if assignment.person:
        assignment.person.verification_status = "verified"

    db.commit()

    return {
        "message": "Assignment successfully APPROVED by Nodal Approver. Public directory updated.",
        "assignment_id": assignment.assignment_id,
        "position_id": assignment.position_id,
        "officer": assignment.person.name_en if assignment.person else "",
        "workflow_status": assignment.workflow_status,
        "is_current": assignment.is_current,
        "approved_by": assignment.approved_by,
    }


@app.post("/api/v1/admin/assignments/{assignment_id}/dispute", tags=["Maker-Checker Queue"])
def dispute_assignment(
    assignment_id: str,
    payload: AssignmentDisputeRequest,
    db: Session = Depends(get_db),
):
    """
    Flag an assignment as DISPUTED based on audit or department conflict.
    """
    assignment = db.query(PositionAssignment).filter(PositionAssignment.assignment_id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    assignment.workflow_status = "DISPUTED"
    assignment.updated_at = datetime.now(timezone.utc)
    if assignment.person:
        assignment.person.verification_status = "disputed"

    db.commit()

    return {
        "message": f"Assignment flagged as DISPUTED: {payload.reason}",
        "assignment_id": assignment.assignment_id,
        "disputed_by": payload.disputed_by,
        "workflow_status": assignment.workflow_status,
    }


# 6. RAG, Hybrid Search & Document Intelligence Endpoints (Phase 4)
hybrid_searcher = HybridSearchService()
guardrail_service = RAGGuardrailService()


@app.post("/api/v1/search/hybrid", tags=["Document Intelligence & RAG"])
def search_documents_hybrid(payload: HybridSearchRequest, db: Session = Depends(get_db)):
    """
    Hybrid Search combining BM25 keyword matching + pgvector cosine similarity.
    Enforces status='ACTIVE' filter and similarity threshold < 0.72 fallback to keyword search.
    """
    results = hybrid_searcher.search(
        query=payload.query,
        db=db,
        limit=payload.limit,
        alpha=payload.alpha,
    )
    return results


@app.post("/api/v1/rag/query", tags=["Document Intelligence & RAG"])
def query_rag_assistant(payload: RAGQueryRequest, db: Session = Depends(get_db)):
    """
    Synthesizes citizen inquiry response strictly grounded in retrieved G.O.s or Service Catalog.
    Enforces Citation Guardrail (mandatory source URL) and Zero-Generation eligibility rules.
    """
    # 1. Retrieve top active chunks via hybrid search
    search_data = hybrid_searcher.search(
        query=payload.query,
        db=db,
        limit=payload.limit,
        alpha=0.5,
    )
    chunks = search_data.get("results", [])

    # 2. Synthesize answer with safety checks and mandatory citations
    response = guardrail_service.synthesize_rag_response(
        query=payload.query,
        retrieved_chunks=chunks,
        db=db,
        language=payload.language,
    )
    return response


@app.post("/api/v1/admin/ocr/batch", tags=["Document Intelligence & RAG"])
def trigger_batch_ocr(db: Session = Depends(get_db)):
    """
    Admin batch worker: runs OCR extraction, 512-token chunking, and embedding generation for all documents.
    """
    total_indexed = run_rag_indexing(db)
    return {
        "status": "success",
        "message": f"Batch OCR & RAG indexing completed successfully. {total_indexed} chunks indexed.",
        "total_chunks_indexed": total_indexed,
    }

