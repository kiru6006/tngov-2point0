import re
from typing import Optional, List, Dict
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from db.session import get_db
from db.models import (
    Service,
    Scheme,
    Document,
    Department,
    Jurisdiction,
    Position,
    Person,
    PositionAssignment,
    Office,
)
from .schemas import (
    ServiceDetailResponse,
    ServiceListResponse,
    SchemeDetailResponse,
    SchemeListResponse,
    DocumentDetailResponse,
    DocumentListResponse,
    UnifiedSearchResponse,
    SearchResultItem,
    SearchSuggestionsResponse,
)

router = APIRouter()


# =========================================================================
# 1. CITIZEN SERVICE CATEGORIES
# =========================================================================

@router.get("/api/v1/service-categories", response_model=List[str], tags=["Citizen Services"])
def list_service_categories(db: Session = Depends(get_db)):
    cats = db.query(Service.citizen_category).distinct().all()
    return [c[0] for c in cats if c[0]]


# =========================================================================
# 2. GOVERNMENT SCHEMES & BENEFITS
# =========================================================================

@router.get("/api/v1/schemes", response_model=SchemeListResponse, tags=["Government Schemes"])
def list_schemes(
    category: Optional[str] = Query(None, description="Category filter (e.g. Women, Education, Agriculture)"),
    department: Optional[str] = Query(None),
    query: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(Scheme).filter(Scheme.status == "ACTIVE")
    if category:
        q = q.filter(Scheme.category.ilike(f"%{category}%"))
    if department:
        q = q.filter(Scheme.department_name.ilike(f"%{department}%"))
    if query:
        q = q.filter(
            or_(
                Scheme.scheme_name_en.ilike(f"%{query}%"),
                Scheme.scheme_name_ta.ilike(f"%{query}%"),
                Scheme.category.ilike(f"%{query}%"),
                Scheme.benefits_provided.ilike(f"%{query}%"),
            )
        )
    schemes = q.all()

    out = []
    for s in schemes:
        out.append(
            SchemeDetailResponse(
                scheme_id=s.scheme_id,
                scheme_name_en=s.scheme_name_en,
                scheme_name_ta=s.scheme_name_ta,
                category=s.category,
                department_name=s.department_name,
                department_id=s.department_id,
                target_beneficiaries=s.target_beneficiaries,
                eligibility_criteria=s.eligibility_criteria,
                benefits_provided=s.benefits_provided,
                required_documents=s.required_documents,
                application_method=s.application_method or "Online / District Office",
                official_portal_url=s.official_portal_url,
                status=s.status,
                source_url=s.source_url,
                last_verified=s.last_verified or "2026-11-17",
                responsible_position_id=s.responsible_position_id,
                responsible_official_name="Nodal Welfare Officer",
            )
        )
    return SchemeListResponse(total=len(out), count=len(out), schemes=out)


@router.get("/api/v1/schemes/{scheme_id}", response_model=SchemeDetailResponse, tags=["Government Schemes"])
def get_scheme_detail(scheme_id: str, db: Session = Depends(get_db)):
    s = db.query(Scheme).filter(Scheme.scheme_id == scheme_id).first()
    if not s:
        raise HTTPException(status_code=404, detail=f"Scheme {scheme_id} not found")

    return SchemeDetailResponse(
        scheme_id=s.scheme_id,
        scheme_name_en=s.scheme_name_en,
        scheme_name_ta=s.scheme_name_ta,
        category=s.category,
        department_name=s.department_name,
        department_id=s.department_id,
        target_beneficiaries=s.target_beneficiaries,
        eligibility_criteria=s.eligibility_criteria,
        benefits_provided=s.benefits_provided,
        required_documents=s.required_documents,
        application_method=s.application_method or "Online / District Office",
        official_portal_url=s.official_portal_url,
        status=s.status,
        source_url=s.source_url,
        last_verified=s.last_verified or "2026-11-17",
        responsible_position_id=s.responsible_position_id,
        responsible_official_name="Nodal Welfare Officer",
    )


@router.get("/api/v1/scheme-categories", response_model=List[str], tags=["Government Schemes"])
def list_scheme_categories(db: Session = Depends(get_db)):
    cats = db.query(Scheme.category).distinct().all()
    return [c[0] for c in cats if c[0]]


# =========================================================================
# 3. GOVERNMENT ORDERS & DOCUMENTS
# =========================================================================

@router.get("/api/v1/documents/{doc_id}", response_model=DocumentDetailResponse, tags=["Government Documents"])
def get_document_detail(doc_id: str, db: Session = Depends(get_db)):
    d = db.query(Document).filter(Document.doc_id == doc_id).first()
    if not d:
        raise HTTPException(status_code=404, detail=f"Document {doc_id} not found")

    return DocumentDetailResponse(
        doc_id=d.doc_id,
        doc_type=d.doc_type,
        department=d.department,
        subject_en=d.subject_en,
        subject_ta=d.subject_ta,
        date_issued=d.date_issued,
        year=d.year,
        file_url=d.file_url,
        is_machine_readable=d.is_machine_readable,
        status=d.status,
        last_verified="2026-11-17",
    )


@router.get("/api/v1/document-categories", response_model=List[str], tags=["Government Documents"])
def list_document_categories(db: Session = Depends(get_db)):
    cats = db.query(Document.doc_type).distinct().all()
    return [c[0] for c in cats if c[0]]


# =========================================================================
# 4. DEPARTMENTS & DISTRICTS DETAIL (Cross-linked to Contact Directory)
# =========================================================================

@router.get("/api/v1/departments/{department_id}/overview", tags=["Master Data"])
def get_department_overview(department_id: str, db: Session = Depends(get_db)):
    dept = db.query(Department).filter(Department.department_id == department_id).first()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    services = db.query(Service).filter(Service.department_owner.ilike(f"%{dept.name_en[:15]}%")).all()
    schemes = db.query(Scheme).filter(Scheme.department_name.ilike(f"%{dept.name_en[:15]}%")).all()
    documents = db.query(Document).filter(Document.department.ilike(f"%{dept.name_en[:15]}%")).all()

    positions = db.query(Position).filter(Position.department_id == dept.department_id).all()
    officials = []
    for p in positions:
        asg = db.query(PositionAssignment).filter(PositionAssignment.position_id == p.position_id, PositionAssignment.is_current == True).first()
        if asg:
            per = db.query(Person).filter(Person.person_id == asg.person_id).first()
            if per:
                officials.append({
                    "position": p.title_en,
                    "name": per.name_en,
                    "phone": per.official_phone,
                    "email": per.official_email,
                })

    return {
        "department_id": dept.department_id,
        "name_en": dept.name_en,
        "name_ta": dept.name_ta,
        "code": dept.code,
        "services_count": len(services),
        "schemes_count": len(schemes),
        "documents_count": len(documents),
        "officials": officials,
    }


@router.get("/api/v1/districts/{jurisdiction_id}/overview", tags=["Master Data"])
def get_district_overview(jurisdiction_id: str, db: Session = Depends(get_db)):
    jur = db.query(Jurisdiction).filter(Jurisdiction.jurisdiction_id == jurisdiction_id).first()
    if not jur:
        raise HTTPException(status_code=404, detail="District jurisdiction not found")

    positions = db.query(Position).filter(Position.jurisdiction_id == jur.jurisdiction_id).all()
    district_officers = []
    for p in positions:
        asg = db.query(PositionAssignment).filter(PositionAssignment.position_id == p.position_id, PositionAssignment.is_current == True).first()
        if asg:
            per = db.query(Person).filter(Person.person_id == asg.person_id).first()
            if per:
                district_officers.append({
                    "position": p.title_en,
                    "name": per.name_en,
                    "phone": per.official_phone,
                    "email": per.official_email,
                })

    return {
        "jurisdiction_id": jur.jurisdiction_id,
        "district_en": jur.district_en,
        "district_ta": jur.district_ta,
        "level": jur.level,
        "officers_count": len(district_officers),
        "officers": district_officers,
    }


# =========================================================================
# 5. UNIFIED SEARCH & SUGGESTIONS
# =========================================================================

@router.get("/api/v1/search", response_model=UnifiedSearchResponse, tags=["Unified Search"])
def unified_portal_search(
    q: str = Query(..., min_length=1, description="Unified search query (Tamil / English / Transliterated)"),
    entity_type: Optional[str] = Query(None, description="SERVICE, SCHEME, DOCUMENT, DEPARTMENT, DISTRICT, CONTACT"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query_text = q.strip().lower()
    results: List[SearchResultItem] = []
    facets: Dict[str, int] = {
        "SERVICE": 0,
        "SCHEME": 0,
        "DOCUMENT": 0,
        "DEPARTMENT": 0,
        "DISTRICT": 0,
        "CONTACT": 0,
    }

    # 1. Services Search
    if not entity_type or entity_type == "SERVICE":
        services = (
            db.query(Service)
            .filter(
                or_(
                    Service.service_name_en.ilike(f"%{query_text}%"),
                    Service.service_name_ta.ilike(f"%{query_text}%"),
                    Service.citizen_category.ilike(f"%{query_text}%"),
                    Service.eligibility_rules.ilike(f"%{query_text}%"),
                )
            )
            .all()
        )
        facets["SERVICE"] = len(services)
        for s in services:
            results.append(
                SearchResultItem(
                    id=s.service_id,
                    title_en=s.service_name_en,
                    title_ta=s.service_name_ta,
                    entity_type="SERVICE",
                    department=s.department_owner,
                    description_en=f"Statutory processing SLA: {s.statutory_sla_days} days. Apply online via e-Sevai.",
                    description_ta=f"சட்டப்பூர்வ காலக்கெடு: {s.statutory_sla_days} நாட்கள். இ-சேவை மூலம் விண்ணப்பிக்கலாம்.",
                    action_url=f"/services/{s.service_id}",
                    action_label_en="View Service & Apply",
                    action_label_ta="சேவை விவரம் & விண்ணப்பம்",
                    verification_status="VERIFIED",
                    relevance_score=1.0 if query_text in s.service_name_en.lower() else 0.8,
                )
            )

    # 2. Schemes Search
    if not entity_type or entity_type == "SCHEME":
        schemes = (
            db.query(Scheme)
            .filter(
                or_(
                    Scheme.scheme_name_en.ilike(f"%{query_text}%"),
                    Scheme.scheme_name_ta.ilike(f"%{query_text}%"),
                    Scheme.category.ilike(f"%{query_text}%"),
                    Scheme.benefits_provided.ilike(f"%{query_text}%"),
                )
            )
            .all()
        )
        facets["SCHEME"] = len(schemes)
        for sc in schemes:
            results.append(
                SearchResultItem(
                    id=sc.scheme_id,
                    title_en=sc.scheme_name_en,
                    title_ta=sc.scheme_name_ta,
                    entity_type="SCHEME",
                    department=sc.department_name,
                    description_en=sc.benefits_provided or "Government welfare assistance scheme",
                    description_ta=sc.benefits_provided,
                    action_url=f"/schemes/{sc.scheme_id}",
                    action_label_en="View Scheme Details",
                    action_label_ta="திட்ட விவரங்கள்",
                    verification_status="VERIFIED",
                    relevance_score=1.0 if query_text in sc.scheme_name_en.lower() else 0.85,
                )
            )

    # 3. Documents Search
    if not entity_type or entity_type == "DOCUMENT":
        documents = (
            db.query(Document)
            .filter(
                or_(
                    Document.subject_en.ilike(f"%{query_text}%"),
                    Document.subject_ta.ilike(f"%{query_text}%"),
                    Document.doc_id.ilike(f"%{query_text}%"),
                )
            )
            .all()
        )
        facets["DOCUMENT"] = len(documents)
        for d in documents:
            results.append(
                SearchResultItem(
                    id=d.doc_id,
                    title_en=f"{d.doc_type}: {d.subject_en[:80]}",
                    title_ta=d.subject_ta[:80],
                    entity_type="DOCUMENT",
                    department=d.department,
                    description_en=f"Issued on {d.date_issued}. Machine-readable verified official publication.",
                    description_ta=f"வெளியிடப்பட்ட நாள்: {d.date_issued}",
                    action_url=f"/documents?query={d.doc_id}",
                    action_label_en="Download G.O. / Document",
                    action_label_ta="ஆவணத்தை பதிவிறக்குக",
                    verification_status="VERIFIED",
                    relevance_score=0.9,
                )
            )

    # 4. Contacts Search
    if not entity_type or entity_type == "CONTACT":
        persons = (
            db.query(Person, PositionAssignment, Position)
            .join(PositionAssignment, PositionAssignment.person_id == Person.person_id)
            .join(Position, Position.position_id == PositionAssignment.position_id)
            .filter(
                PositionAssignment.is_current == True,
                or_(
                    Person.name_en.ilike(f"%{query_text}%"),
                    Person.name_ta.ilike(f"%{query_text}%"),
                    Position.title_en.ilike(f"%{query_text}%"),
                ),
            )
            .limit(10)
            .all()
        )
        facets["CONTACT"] = len(persons)
        for per, asg, pos in persons:
            results.append(
                SearchResultItem(
                    id=pos.position_id,
                    title_en=f"{per.name_en} - {pos.title_en}",
                    title_ta=f"{per.name_ta} - {pos.title_ta}",
                    entity_type="CONTACT",
                    department=pos.department.name_en if pos.department else "Tamil Nadu Govt",
                    description_en=f"Official Phone: {per.official_phone or 'Office'} | Email: {per.official_email or 'N/A'}",
                    action_url=f"/contact-directory?query={per.name_en}",
                    action_label_en="View Official in Directory",
                    action_label_ta="அதிகாரி விவரம்",
                    verification_status="VERIFIED",
                    relevance_score=0.95,
                )
            )

    # 5. Departments Search
    if not entity_type or entity_type == "DEPARTMENT":
        depts = (
            db.query(Department)
            .filter(
                or_(
                    Department.name_en.ilike(f"%{query_text}%"),
                    Department.name_ta.ilike(f"%{query_text}%"),
                )
            )
            .all()
        )
        facets["DEPARTMENT"] = len(depts)
        for dep in depts:
            results.append(
                SearchResultItem(
                    id=dep.department_id,
                    title_en=dep.name_en,
                    title_ta=dep.name_ta,
                    entity_type="DEPARTMENT",
                    department=dep.name_en,
                    description_en="Secretariat Administrative Department of Government of Tamil Nadu.",
                    action_url="/departments",
                    action_label_en="View Department Services & Leadership",
                    action_label_ta="துறை சேவைகள் & தலைமை",
                    verification_status="VERIFIED",
                    relevance_score=0.8,
                )
            )

    # 6. Districts Search
    if not entity_type or entity_type == "DISTRICT":
        jurs = (
            db.query(Jurisdiction)
            .filter(
                or_(
                    Jurisdiction.district_en.ilike(f"%{query_text}%"),
                    Jurisdiction.district_ta.ilike(f"%{query_text}%"),
                )
            )
            .all()
        )
        facets["DISTRICT"] = len(jurs)
        for jur in jurs:
            results.append(
                SearchResultItem(
                    id=jur.jurisdiction_id,
                    title_en=f"District Collectorate - {jur.district_en}",
                    title_ta=f"மாவட்ட ஆட்சியர் அலுவலகம் - {jur.district_ta}",
                    entity_type="DISTRICT",
                    district=jur.district_en,
                    description_en=f"Revenue District Administration, Taluks, and Collectorate services in {jur.district_en}.",
                    action_url="/districts",
                    action_label_en="View District Collectorate",
                    action_label_ta="மாவட்ட ஆட்சியர் விவரம்",
                    verification_status="VERIFIED",
                    relevance_score=0.85,
                )
            )

    # Sort results by relevance score descending
    results.sort(key=lambda x: x.relevance_score, reverse=True)

    offset = (page - 1) * limit
    paginated = results[offset : offset + limit]

    return UnifiedSearchResponse(
        query=q,
        total=len(results),
        page=page,
        limit=limit,
        results=paginated,
        facets=facets,
    )


@router.get("/api/v1/search/suggestions", response_model=SearchSuggestionsResponse, tags=["Unified Search"])
def get_search_suggestions(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    query_text = q.strip().lower()
    suggestions = set()

    # Match service names
    srvs = db.query(Service.service_name_en).filter(Service.service_name_en.ilike(f"%{query_text}%")).limit(4).all()
    for s in srvs:
        suggestions.add(s[0])

    # Match scheme names
    schs = db.query(Scheme.scheme_name_en).filter(Scheme.scheme_name_en.ilike(f"%{query_text}%")).limit(4).all()
    for sc in schs:
        suggestions.add(sc[0])

    # Match officials
    pers = db.query(Person.name_en).filter(Person.name_en.ilike(f"%{query_text}%")).limit(3).all()
    for p in pers:
        suggestions.add(p[0])

    # Match districts
    dists = db.query(Jurisdiction.district_en).filter(Jurisdiction.district_en.ilike(f"%{query_text}%")).limit(3).all()
    for d in dists:
        suggestions.add(f"{d[0]} District")

    return SearchSuggestionsResponse(query=q, suggestions=sorted(list(suggestions))[:8])
