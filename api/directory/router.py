import json
import uuid
from datetime import datetime, timezone
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from db.session import get_db
from db.models import (
    Department,
    Position,
    Person,
    PositionAssignment,
    Office,
    Jurisdiction,
    DirectoryCategory,
    SourceDocument,
    SourceEvidence,
    ChangeRequest,
    ApprovalWorkflow,
    AuditEvent,
)
from .schemas import (
    ContactListResponse,
    ContactDetail,
    DepartmentSchema,
    OfficeSchema,
    DistrictSchema,
    PositionSchema,
    HierarchyNode,
    CategorySchema,
    DataQualityMetrics,
    ConflictItem,
    OfficerTransferRequest,
    OfficerTransferResponse,
    ChangeRequestCreate,
    ChangeRequestReview,
    ChangeRequestResponse,
    SourceDocumentSchema,
)
from .service import DirectoryService

router = APIRouter()


# =========================================================================
# 1. PUBLIC DIRECTORY APIs
# =========================================================================

@router.get("/api/v1/directory/contacts", response_model=ContactListResponse, tags=["Directory - Public"])
def list_directory_contacts(
    query: Optional[str] = Query(None, description="Bilingual search query (Name, Designation, Department, District)"),
    department_id: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    cadre: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    is_vacant: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return DirectoryService.search_contacts(
        db,
        query=query,
        department_id=department_id,
        district=district,
        cadre=cadre,
        status=status,
        is_vacant=is_vacant,
        page=page,
        limit=limit,
    )


@router.get("/api/v1/directory/contacts/{position_id}", response_model=ContactDetail, tags=["Directory - Public"])
def get_contact_detail(position_id: str, db: Session = Depends(get_db)):
    contact = DirectoryService.get_contact_by_id(db, position_id)
    if not contact:
        raise HTTPException(status_code=404, detail=f"Contact for position {position_id} not found")
    return contact


@router.get("/api/v1/directory/search", response_model=ContactListResponse, tags=["Directory - Public"])
def search_directory(
    q: str = Query(..., description="Unified bilingual text search parameter"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return DirectoryService.search_contacts(db, query=q, page=page, limit=limit)


@router.get("/api/v1/directory/departments", response_model=List[DepartmentSchema], tags=["Directory - Public"])
def list_departments(db: Session = Depends(get_db)):
    return DirectoryService.get_departments(db)


@router.get("/api/v1/directory/departments/{department_id}", response_model=DepartmentSchema, tags=["Directory - Public"])
def get_department_detail(department_id: str, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.department_id == department_id).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    tot = db.query(Position).filter(Position.department_id == dept.department_id).count()
    vac = db.query(Position).filter(Position.department_id == dept.department_id, Position.is_vacant == True).count()
    return DepartmentSchema(
        department_id=dept.department_id,
        name_en=dept.name_en,
        name_ta=dept.name_ta,
        code=dept.code,
        category_id=dept.category_id,
        total_positions=tot,
        vacant_positions=vac,
    )


@router.get("/api/v1/directory/offices", response_model=List[OfficeSchema], tags=["Directory - Public"])
def list_offices(department_id: Optional[str] = None, db: Session = Depends(get_db)):
    return DirectoryService.get_offices(db, department_id=department_id)


@router.get("/api/v1/directory/districts", response_model=List[DistrictSchema], tags=["Directory - Public"])
def list_districts(db: Session = Depends(get_db)):
    return DirectoryService.get_districts(db)


@router.get("/api/v1/directory/positions", response_model=List[PositionSchema], tags=["Directory - Public"])
def list_positions(
    department_id: Optional[str] = None,
    is_vacant: Optional[bool] = None,
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    q = db.query(Position)
    if department_id:
        q = q.filter(Position.department_id == department_id)
    if is_vacant is not None:
        q = q.filter(Position.is_vacant == is_vacant)

    positions = q.limit(limit).all()
    out = []
    for p in positions:
        dept = db.query(Department).filter(Department.department_id == p.department_id).first()
        jur = db.query(Jurisdiction).filter(Jurisdiction.jurisdiction_id == p.jurisdiction_id).first()
        off = db.query(Office).filter(Office.office_id == p.office_id).first() if p.office_id else None

        asg = (
            db.query(PositionAssignment)
            .filter(PositionAssignment.position_id == p.position_id, PositionAssignment.is_current == True)
            .first()
        )
        occupant_name = None
        if asg:
            per = db.query(Person).filter(Person.person_id == asg.person_id).first()
            if per:
                occupant_name = per.name_en

        out.append(
            PositionSchema(
                position_id=p.position_id,
                title_en=p.title_en,
                title_ta=p.title_ta,
                department_id=p.department_id,
                department_name=dept.name_en if dept else "Unknown",
                office_id=p.office_id,
                office_name=off.name_en if off else None,
                district=jur.district_en if jur else "State",
                cadre=p.cadre,
                sanctioned_strength=p.sanctioned_strength or 1,
                is_vacant=p.is_vacant,
                current_occupant_name=occupant_name,
                status=p.status,
            )
        )
    return out


@router.get("/api/v1/directory/hierarchy", response_model=HierarchyNode, tags=["Directory - Public"])
def get_hierarchy(department_id: Optional[str] = None, db: Session = Depends(get_db)):
    return DirectoryService.build_hierarchy(db, root_department_id=department_id)


@router.get("/api/v1/directory/categories", response_model=List[CategorySchema], tags=["Directory - Public"])
def list_categories(db: Session = Depends(get_db)):
    return DirectoryService.get_categories(db)


@router.get("/api/v1/directory/sources/{source_id}", response_model=SourceDocumentSchema, tags=["Directory - Public"])
def get_source_registry_item(source_id: str, db: Session = Depends(get_db)):
    src = db.query(SourceDocument).filter(SourceDocument.source_id == source_id).first()
    if not src:
        raise HTTPException(status_code=404, detail="Source document not found in official registry")
    return SourceDocumentSchema(
        source_id=src.source_id,
        org_name=src.org_name,
        source_url=src.source_url,
        source_type=src.source_type,
        data_category=src.data_category,
        retrieval_method=src.retrieval_method,
        publication_date=src.publication_date,
        content_hash=src.content_hash,
        verification_status=src.verification_status,
        last_successful_retrieval=src.last_successful_retrieval.isoformat() if src.last_successful_retrieval else None,
        responsible_owner=src.responsible_owner,
    )


# =========================================================================
# 2. AUTHORIZED ADMINISTRATION & WORKFLOW APIs
# =========================================================================

@router.post("/api/v1/admin/directory/transfers", response_model=OfficerTransferResponse, tags=["Directory - Admin"])
def transfer_officer(req: OfficerTransferRequest, db: Session = Depends(get_db)):
    try:
        return DirectoryService.execute_officer_transfer(db, req)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/api/v1/admin/directory/change-requests", response_model=ChangeRequestResponse, status_code=status.HTTP_201_CREATED, tags=["Directory - Admin"])
def create_change_request(req: ChangeRequestCreate, db: Session = Depends(get_db)):
    cr = ChangeRequest(
        request_id=f"CR-{uuid.uuid4().hex[:8].upper()}",
        change_type=req.change_type,
        department_id=req.department_id,
        position_id=req.position_id,
        person_id=req.person_id,
        payload_json=json.dumps(req.payload),
        effective_date=req.effective_date,
        go_reference=req.go_reference,
        status="DRAFT",
        requested_by=req.requested_by,
    )
    db.add(cr)
    db.commit()

    return ChangeRequestResponse(
        request_id=cr.request_id,
        change_type=cr.change_type,
        department_id=cr.department_id,
        position_id=cr.position_id,
        person_id=cr.person_id,
        effective_date=cr.effective_date,
        go_reference=cr.go_reference,
        status=cr.status,
        requested_by=cr.requested_by,
        created_at=cr.created_at.isoformat() if cr.created_at else "",
        updated_at=cr.updated_at.isoformat() if cr.updated_at else "",
        workflows=[],
    )


@router.get("/api/v1/admin/directory/change-requests", response_model=List[ChangeRequestResponse], tags=["Directory - Admin"])
def list_change_requests(status_filter: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(ChangeRequest)
    if status_filter:
        q = q.filter(ChangeRequest.status == status_filter)
    crs = q.order_by(ChangeRequest.created_at.desc()).all()
    out = []
    for cr in crs:
        workflows = [
            {
                "step_number": wf.step_number,
                "assigned_role": wf.assigned_role,
                "action_taken": wf.action_taken,
                "actor_id": wf.actor_id,
                "comments": wf.comments,
                "action_timestamp": wf.action_timestamp.isoformat() if wf.action_timestamp else "",
            }
            for wf in cr.workflows
        ]
        out.append(
            ChangeRequestResponse(
                request_id=cr.request_id,
                change_type=cr.change_type,
                department_id=cr.department_id,
                position_id=cr.position_id,
                person_id=cr.person_id,
                effective_date=cr.effective_date,
                go_reference=cr.go_reference,
                status=cr.status,
                requested_by=cr.requested_by,
                created_at=cr.created_at.isoformat() if cr.created_at else "",
                updated_at=cr.updated_at.isoformat() if cr.updated_at else "",
                workflows=workflows,
            )
        )
    return out


@router.post("/api/v1/admin/directory/change-requests/{request_id}/submit", tags=["Directory - Admin"])
def submit_change_request(request_id: str, actor_id: str = "Department Editor", db: Session = Depends(get_db)):
    cr = db.query(ChangeRequest).filter(ChangeRequest.request_id == request_id).first()
    if not cr:
        raise HTTPException(status_code=404, detail="Change request not found")
    if cr.status != "DRAFT":
        raise HTTPException(status_code=400, detail=f"Cannot submit request in status {cr.status}")

    cr.status = "PENDING_VERIFICATION"
    wf = ApprovalWorkflow(
        request_id=cr.request_id,
        step_number=1,
        assigned_role="DEPARTMENT_VERIFIER",
        action_taken="SUBMIT",
        actor_id=actor_id,
        comments="Submitted for departmental verification",
    )
    db.add(wf)
    db.commit()
    return {"message": "Change request submitted for verification", "status": cr.status}


@router.post("/api/v1/admin/directory/change-requests/{request_id}/verify", tags=["Directory - Admin"])
def verify_change_request(request_id: str, review: ChangeRequestReview, db: Session = Depends(get_db)):
    cr = db.query(ChangeRequest).filter(ChangeRequest.request_id == request_id).first()
    if not cr:
        raise HTTPException(status_code=404, detail="Change request not found")

    if review.action == "VERIFY":
        cr.status = "VERIFIED"
    elif review.action == "REJECT":
        cr.status = "REJECTED"
    elif review.action == "REQUEST_CORRECTION":
        cr.status = "NEEDS_CORRECTION"
    else:
        raise HTTPException(status_code=400, detail="Invalid verification action")

    wf = ApprovalWorkflow(
        request_id=cr.request_id,
        step_number=2,
        assigned_role="DEPARTMENT_APPROVER",
        action_taken=review.action,
        actor_id=review.actor_id,
        comments=review.comments,
    )
    db.add(wf)
    db.commit()
    return {"message": f"Change request verified: {review.action}", "status": cr.status}


@router.post("/api/v1/admin/directory/change-requests/{request_id}/approve", tags=["Directory - Admin"])
def approve_change_request(request_id: str, review: ChangeRequestReview, db: Session = Depends(get_db)):
    cr = db.query(ChangeRequest).filter(ChangeRequest.request_id == request_id).first()
    if not cr:
        raise HTTPException(status_code=404, detail="Change request not found")

    cr.status = "APPROVED"
    wf = ApprovalWorkflow(
        request_id=cr.request_id,
        step_number=3,
        assigned_role="STATE_DIRECTORY_ADMIN",
        action_taken="APPROVE",
        actor_id=review.actor_id,
        comments=review.comments,
    )
    db.add(wf)

    # Audit
    audit = AuditEvent(
        event_id=f"AUD-CR-{uuid.uuid4().hex[:8].upper()}",
        event_type="CHANGE_REQUEST_APPROVED",
        entity_type="CHANGE_REQUEST",
        entity_id=cr.request_id,
        actor_id=review.actor_id,
        actor_role=review.actor_role,
        details_json=cr.payload_json,
    )
    db.add(audit)
    db.commit()
    return {"message": "Change request approved and staged for publication", "status": cr.status}


@router.post("/api/v1/admin/directory/change-requests/{request_id}/reject", tags=["Directory - Admin"])
def reject_change_request(request_id: str, review: ChangeRequestReview, db: Session = Depends(get_db)):
    cr = db.query(ChangeRequest).filter(ChangeRequest.request_id == request_id).first()
    if not cr:
        raise HTTPException(status_code=404, detail="Change request not found")

    cr.status = "REJECTED"
    wf = ApprovalWorkflow(
        request_id=cr.request_id,
        step_number=3,
        assigned_role="STATE_DIRECTORY_ADMIN",
        action_taken="REJECT",
        actor_id=review.actor_id,
        comments=review.comments,
    )
    db.add(wf)
    db.commit()
    return {"message": "Change request rejected", "status": cr.status}


@router.get("/api/v1/admin/directory/audit-events", tags=["Directory - Admin"])
def list_audit_events(limit: int = 50, db: Session = Depends(get_db)):
    events = db.query(AuditEvent).order_by(AuditEvent.timestamp.desc()).limit(limit).all()
    return [
        {
            "event_id": e.event_id,
            "event_type": e.event_type,
            "entity_type": e.entity_type,
            "entity_id": e.entity_id,
            "actor_id": e.actor_id,
            "actor_role": e.actor_role,
            "ip_address": e.ip_address,
            "details": json.loads(e.details_json) if e.details_json else {},
            "timestamp": e.timestamp.isoformat() if e.timestamp else "",
        }
        for e in events
    ]


# =========================================================================
# 3. DATA QUALITY & CONFLICT DETECTION APIs
# =========================================================================

@router.get("/api/v1/admin/directory/quality/metrics", response_model=DataQualityMetrics, tags=["Directory - Quality"])
def get_quality_metrics(db: Session = Depends(get_db)):
    return DirectoryService.compute_data_quality_metrics(db)


@router.get("/api/v1/admin/directory/conflicts", response_model=List[ConflictItem], tags=["Directory - Quality"])
def list_directory_conflicts(db: Session = Depends(get_db)):
    return DirectoryService.get_conflicts(db)
