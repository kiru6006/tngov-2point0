import os
import csv
import json
import logging
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from .session import SessionLocal, engine, Base
from .models import (
    Department,
    Jurisdiction,
    Position,
    Person,
    PositionAssignment,
    Service,
    Scheme,
    Document,
    DocumentChunk,
    DirectoryCategory,
    Office,
    OfficialContactChannel,
    SourceDocument,
    SourceEvidence,
    DepartmentNodalOfficer,
)
from rag.pipeline import run_rag_indexing

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(BASE_DIR, "data")
WEB_DATA_DIR = os.path.join(BASE_DIR, "web", "src", "data")


def ingest_services(db: Session) -> int:
    csv_path = os.path.join(DATA_DIR, "service-catalogue.csv")
    if not os.path.exists(csv_path):
        logger.warning("service-catalogue.csv not found at %s", csv_path)
        return 0

    count = 0
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            service_id = row.get("service_id", "").strip()
            if not service_id:
                continue

            existing = db.query(Service).filter(Service.service_id == service_id).first()
            if not existing:
                existing = Service(service_id=service_id)
                db.add(existing)

            existing.service_name_en = row.get("service_name_en", "")
            existing.service_name_ta = row.get("service_name_ta", "")
            existing.department_owner = row.get("department_owner", "")
            existing.citizen_category = row.get("citizen_category", "")
            existing.eligibility_rules = row.get("eligibility_rules", "")
            existing.required_docs = row.get("required_docs", "")
            existing.statutory_sla_days = int(row.get("statutory_sla_days", 15) or 15)
            existing.service_channel = row.get("service_channel", "Online (e-Sevai)")
            existing.action_url = row.get("action_url", "")
            count += 1

    db.commit()
    logger.info("Ingested %d services", count)
    return count


def ingest_documents(db: Session) -> int:
    count = 0
    # 1. From CSV
    csv_path = os.path.join(DATA_DIR, "document-catalogue.csv")
    if os.path.exists(csv_path):
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                doc_id = row.get("doc_id", "").strip()
                if not doc_id:
                    continue

                date_issued = row.get("date_issued", "")
                year = date_issued.split("-")[0] if "-" in date_issued else "2026"
                is_mr = row.get("is_machine_readable", "true").lower() in ("true", "1", "yes")

                existing = db.query(Document).filter(Document.doc_id == doc_id).first()
                if not existing:
                    existing = Document(doc_id=doc_id)
                    db.add(existing)

                existing.doc_type = row.get("doc_type", "")
                existing.department = row.get("department", "")
                existing.subject_en = row.get("subject_en", "")
                existing.subject_ta = row.get("subject_ta", "")
                existing.date_issued = date_issued
                existing.year = year
                existing.file_url = row.get("file_url", "")
                existing.is_machine_readable = is_mr
                count += 1

    # 2. From JSON if present
    json_path = os.path.join(WEB_DATA_DIR, "documents.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            docs = json.load(f)
            for item in docs:
                doc_id = item.get("id") or item.get("doc_id")
                if not doc_id:
                    continue

                existing = db.query(Document).filter(Document.doc_id == doc_id).first()
                if not existing:
                    existing = Document(doc_id=doc_id)
                    db.add(existing)

                existing.doc_type = item.get("type", "Government Order")
                existing.department = item.get("department", "")
                existing.subject_en = item.get("title_en", "")
                existing.subject_ta = item.get("title_ta", "")
                existing.date_issued = item.get("date", "2026-01-01")
                existing.year = str(item.get("year", "2026"))
                existing.file_url = item.get("download_url", "")
                existing.is_machine_readable = bool(item.get("is_machine_readable", True))
                count += 1

    db.commit()
    logger.info("Ingested %d documents", count)
    return count


def ingest_contacts(db: Session) -> int:
    json_path = os.path.join(WEB_DATA_DIR, "contacts.json")
    if not os.path.exists(json_path):
        logger.warning("contacts.json not found at %s", json_path)
        return 0

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        officials = data.get("officials", [])

    # Preload caches from DB
    dept_cache = {d.name_en: d.department_id for d in db.query(Department).all()}
    jur_cache = {j.district_en: j.jurisdiction_id for j in db.query(Jurisdiction).all()}
    count = 0

    for off in officials:
        dept_name_en = off.get("department_en", "Public Department")
        dept_name_ta = off.get("department_ta", dept_name_en)
        if dept_name_en not in dept_cache:
            dept_id = f"DEP-{len(dept_cache) + 1:04d}"
            dept = Department(
                department_id=dept_id,
                name_en=dept_name_en,
                name_ta=dept_name_ta,
            )
            db.add(dept)
            db.flush()
            dept_cache[dept_name_en] = dept.department_id

        dist_name_en = off.get("district_en", "Chennai")
        dist_name_ta = off.get("district_ta", dist_name_en)
        if dist_name_en not in jur_cache:
            jur_id = f"JUR-{len(jur_cache) + 1:04d}"
            jur = Jurisdiction(
                jurisdiction_id=jur_id,
                district_en=dist_name_en,
                district_ta=dist_name_ta,
                level="District" if dist_name_en != "State Level" else "State",
            )
            db.add(jur)
            db.flush()
            jur_cache[dist_name_en] = jur.jurisdiction_id

        # Position
        pos_id = off.get("id", f"POS-{count + 1:03d}")
        position = db.query(Position).filter(Position.position_id == pos_id).first()
        if not position:
            position = Position(
                position_id=pos_id,
                title_en=off.get("designation_en", ""),
                title_ta=off.get("designation_ta", ""),
                department_id=dept_cache[dept_name_en],
                jurisdiction_id=jur_cache[dist_name_en],
                cadre=off.get("cadre", "State Cadre"),
                status="active" if off.get("status", "Active").lower() == "active" else "vacant",
            )
            db.add(position)
            db.flush()

        # Person
        per_id = f"PER-{pos_id.replace('POS-', '')}"
        person = db.query(Person).filter(Person.person_id == per_id).first()
        if not person:
            person = Person(
                person_id=per_id,
                name_en=off.get("name_en", ""),
                name_ta=off.get("name_ta", ""),
                official_email=off.get("email", ""),
                official_phone=off.get("phone", ""),
                office_address=off.get("office", ""),
                verification_status="verified" if off.get("verified", True) else "pending",
            )
            db.add(person)
            db.flush()

        # Assignment
        asg = (
            db.query(PositionAssignment)
            .filter(
                PositionAssignment.position_id == position.position_id,
                PositionAssignment.person_id == person.person_id,
            )
            .first()
        )
        if not asg:
            asg = PositionAssignment(
                assignment_id=f"ASG-{pos_id.replace('POS-', '')}",
                position_id=position.position_id,
                person_id=person.person_id,
                start_date="2024-01-01",
                transfer_go_ref=off.get("go_ref", "G.O. Ms. No. 100 Public"),
                is_current=True,
                workflow_status="APPROVED",
                submitted_by="Initial Ingestion",
                approved_by="Joint Secretary (Nodal Approver)",
            )
            db.add(asg)
        else:
            asg.is_current = True
            asg.workflow_status = "APPROVED"
            asg.transfer_go_ref = off.get("go_ref", "G.O. Ms. No. 100 Public")

        count += 1

    db.commit()
    logger.info("Ingested %d contact/official records", count)
    return count


def ingest_directory_master_data(db: Session) -> int:
    # 1. Directory Categories
    categories = [
        {"id": "CAT-LEADER", "code": "LEADERSHIP", "name_en": "State Leadership", "name_ta": "மாநில தலைமை", "icon": "Crown", "order": 1},
        {"id": "CAT-LEG", "code": "LEGISLATURE", "name_en": "Legislature & MPs/MLAs", "name_ta": "சட்டமன்றம் & நாடாளுமன்றம்", "icon": "Landmark", "order": 2},
        {"id": "CAT-DEPT", "code": "DEPT_ADMIN", "name_en": "Department Administration", "name_ta": "துறை நிர்வாகம்", "icon": "Building2", "order": 3},
        {"id": "CAT-DIST", "code": "DIST_ADMIN", "name_en": "District Administration", "name_ta": "மாவட்ட நிர்வாகம்", "icon": "MapPin", "order": 4},
        {"id": "CAT-BOARD", "code": "BOARDS", "name_en": "Boards & Public Undertakings", "name_ta": "வாரியங்கள் & பொதுத்துறை", "icon": "Briefcase", "order": 5},
        {"id": "CAT-RTI", "code": "CITIZEN_SUPPORT", "name_en": "Citizen Support & RTI Authorities", "name_ta": "தகவல் உரிமை & உதவி மையங்கள்", "icon": "LifeBuoy", "order": 6},
    ]

    for cat in categories:
        existing = db.query(DirectoryCategory).filter(DirectoryCategory.category_id == cat["id"]).first()
        if not existing:
            existing = DirectoryCategory(
                category_id=cat["id"],
                code=cat["code"],
                name_en=cat["name_en"],
                name_ta=cat["name_ta"],
                icon=cat["icon"],
                sort_order=cat["order"],
            )
            db.add(existing)

    # 2. Source Documents (Official Verification Registry)
    sources = [
        {
            "id": "SRC-GAZETTE-2026",
            "org": "Public (Special.A) Department",
            "url": "https://www.tn.gov.in/stationery_printing/gazette",
            "type": "GAZETTE_GO",
            "category": "IAS Postings & Transfers",
            "date": "2026-02-15",
            "owner": "Chief Secretary Secretariat",
        },
        {
            "id": "SRC-PORTAL-DIR",
            "org": "Tamil Nadu e-Governance Agency (TNeGA)",
            "url": "https://www.tn.gov.in/contact_directory.php",
            "type": "GOVERNMENT_WEBPAGE",
            "category": "Secretariat & Department Contacts",
            "date": "2026-03-01",
            "owner": "State Nodal Directory Officer",
        },
    ]

    for s in sources:
        existing_s = db.query(SourceDocument).filter(SourceDocument.source_id == s["id"]).first()
        if not existing_s:
            existing_s = SourceDocument(
                source_id=s["id"],
                org_name=s["org"],
                source_url=s["url"],
                source_type=s["type"],
                data_category=s["category"],
                publication_date=s["date"],
                responsible_owner=s["owner"],
                verification_status="VERIFIED",
            )
            db.add(existing_s)

    db.commit()
    logger.info("Ingested directory master categories and source registry.")
    return len(categories)


def ingest_schemes(db: Session) -> int:
    json_path = os.path.join(WEB_DATA_DIR, "schemes.json")
    if not os.path.exists(json_path):
        logger.warning("schemes.json not found at %s", json_path)
        return 0

    with open(json_path, "r", encoding="utf-8") as f:
        schemes = json.load(f)

    dept_cache = {d.name_en: d.department_id for d in db.query(Department).all()}
    count = 0

    for s in schemes:
        scheme_id = s.get("id")
        existing = db.query(Scheme).filter(Scheme.scheme_id == scheme_id).first()
        if not existing:
            existing = Scheme(scheme_id=scheme_id)
            db.add(existing)

        dept_name = s.get("dept_en", "Social Welfare")
        dept_id = dept_cache.get(dept_name)

        existing.scheme_name_en = s.get("name_en", "")
        existing.scheme_name_ta = s.get("name_ta", "")
        existing.category = s.get("category", "")
        existing.department_name = dept_name
        existing.department_id = dept_id
        existing.target_beneficiaries = s.get("target_beneficiaries", "")
        existing.eligibility_criteria = s.get("eligibility", "")
        existing.benefits_provided = s.get("benefits", "")
        existing.required_documents = s.get("required_docs", "")
        existing.application_method = s.get("application_method", "")
        existing.official_portal_url = s.get("official_url", "")
        existing.status = s.get("status", "ACTIVE")
        existing.source_url = s.get("official_url", "")
        existing.last_verified = "2026-11-17"
        count += 1

    db.commit()
    logger.info("Ingested %d government schemes", count)
    return count


def run_all(db: Session = None):
    close_when_done = False
    if db is None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        close_when_done = True

    try:
        s_count = ingest_services(db)
        sc_count = ingest_schemes(db)
        d_count = ingest_documents(db)
        c_count = ingest_contacts(db)
        m_count = ingest_directory_master_data(db)
        r_count = run_rag_indexing(db)
        print(f"Ingestion complete: {s_count} services, {sc_count} schemes, {d_count} documents, {c_count} contacts, {m_count} categories, {r_count} RAG chunks.")
    finally:
        if close_when_done:
            db.close()


if __name__ == "__main__":
    run_all()
