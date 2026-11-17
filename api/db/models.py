import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Boolean,
    Integer,
    Text,
    DateTime,
    ForeignKey,
    Float,
)
from sqlalchemy.orm import relationship
from .session import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class DirectoryCategory(Base):
    __tablename__ = "directory_categories"

    category_id = Column(String(64), primary_key=True, default=generate_uuid)
    name_en = Column(String(255), nullable=False)
    name_ta = Column(String(255), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    icon = Column(String(50), default="Users")
    sort_order = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)

    departments = relationship("Department", back_populates="category")


class Department(Base):
    __tablename__ = "departments"

    department_id = Column(String(64), primary_key=True, default=generate_uuid)
    name_en = Column(String(255), nullable=False)
    name_ta = Column(String(255), nullable=False)
    code = Column(String(50), nullable=True)
    category_id = Column(String(64), ForeignKey("directory_categories.category_id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    category = relationship("DirectoryCategory", back_populates="departments")
    positions = relationship("Position", back_populates="department")
    offices = relationship("Office", back_populates="department")
    nodal_officers = relationship("DepartmentNodalOfficer", back_populates="department")


class Jurisdiction(Base):
    __tablename__ = "jurisdictions"

    jurisdiction_id = Column(String(64), primary_key=True, default=generate_uuid)
    district_en = Column(String(255), nullable=False)
    district_ta = Column(String(255), nullable=False)
    taluk_en = Column(String(255), nullable=True)
    taluk_ta = Column(String(255), nullable=True)
    level = Column(String(50), default="District")  # State, Zone, District, Taluk, Village

    positions = relationship("Position", back_populates="jurisdiction")
    offices = relationship("Office", back_populates="jurisdiction")


class Office(Base):
    __tablename__ = "offices"

    office_id = Column(String(64), primary_key=True, default=generate_uuid)
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=False)
    jurisdiction_id = Column(String(64), ForeignKey("jurisdictions.jurisdiction_id"), nullable=True)
    parent_office_id = Column(String(64), ForeignKey("offices.office_id"), nullable=True)
    name_en = Column(String(255), nullable=False)
    name_ta = Column(String(255), nullable=False)
    office_type = Column(String(100), default="Directorate")  # Secretariat, Directorate, Regional, District Collectorate, Taluk, Subordinate
    address_en = Column(String(500), nullable=True)
    address_ta = Column(String(500), nullable=True)
    status = Column(String(50), default="active")

    department = relationship("Department", back_populates="offices")
    jurisdiction = relationship("Jurisdiction", back_populates="offices")
    positions = relationship("Position", back_populates="office")
    administrative_units = relationship("AdministrativeUnit", back_populates="office")
    contact_channels = relationship("OfficialContactChannel", back_populates="office")


class AdministrativeUnit(Base):
    __tablename__ = "administrative_units"

    unit_id = Column(String(64), primary_key=True, default=generate_uuid)
    office_id = Column(String(64), ForeignKey("offices.office_id"), nullable=False)
    unit_name_en = Column(String(255), nullable=False)
    unit_name_ta = Column(String(255), nullable=False)
    unit_type = Column(String(100), default="Division")  # Wing, Zone, Region, Circle, Division, Subdivision

    office = relationship("Office", back_populates="administrative_units")


class Position(Base):
    __tablename__ = "positions"

    position_id = Column(String(64), primary_key=True, default=generate_uuid)
    title_en = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=False)
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=False)
    office_id = Column(String(64), ForeignKey("offices.office_id"), nullable=True)
    jurisdiction_id = Column(String(64), ForeignKey("jurisdictions.jurisdiction_id"), nullable=False)
    reports_to_position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=True)
    cadre = Column(String(50), nullable=False)  # IAS, IPS, IFS, DRO, State Cadre, Judicial, Legislative
    sanctioned_strength = Column(Integer, default=1)
    status = Column(String(50), default="active")  # active, vacant, abolished
    is_vacant = Column(Boolean, default=False)

    department = relationship("Department", back_populates="positions")
    office = relationship("Office", back_populates="positions")
    jurisdiction = relationship("Jurisdiction", back_populates="positions")
    assignments = relationship("PositionAssignment", back_populates="position")
    contact_channels = relationship("OfficialContactChannel", back_populates="position")


class Person(Base):
    __tablename__ = "persons"

    person_id = Column(String(64), primary_key=True, default=generate_uuid)
    name_en = Column(String(255), nullable=False)
    name_ta = Column(String(255), nullable=False)
    official_email = Column(String(255), nullable=True)
    official_phone = Column(String(50), nullable=True)
    office_address = Column(String(255), nullable=True)
    verification_status = Column(String(50), default="verified")  # verified, pending, disputed
    status = Column(String(50), default="active")  # active, transferred_out, retired
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    assignments = relationship("PositionAssignment", back_populates="person")


class PositionAssignment(Base):
    __tablename__ = "position_assignments"

    assignment_id = Column(String(64), primary_key=True, default=generate_uuid)
    position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=False)
    person_id = Column(String(64), ForeignKey("persons.person_id"), nullable=False)
    assignment_type = Column(String(50), default="PRIMARY")  # PRIMARY, ADDITIONAL_CHARGE, ACTING, TEMPORARY
    start_date = Column(String(50), nullable=False)
    end_date = Column(String(50), nullable=True)
    transfer_go_ref = Column(String(100), nullable=False)
    is_current = Column(Boolean, default=True)
    workflow_status = Column(
        String(50), default="APPROVED"
    )  # DRAFT, PENDING_VERIFICATION, VERIFIED, PENDING_APPROVAL, APPROVED, REJECTED, NEEDS_CORRECTION, SUPERSEDED, ARCHIVED
    submitted_by = Column(String(100), nullable=True)
    verified_by = Column(String(100), nullable=True)
    approved_by = Column(String(100), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    approved_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    position = relationship("Position", back_populates="assignments")
    person = relationship("Person", back_populates="assignments")


class OfficialContactChannel(Base):
    __tablename__ = "official_contact_channels"

    channel_id = Column(String(64), primary_key=True, default=generate_uuid)
    position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=True)
    office_id = Column(String(64), ForeignKey("offices.office_id"), nullable=True)
    channel_type = Column(String(50), nullable=False)  # OFFICIAL_PHONE, OFFICIAL_EMAIL, FAX, HELPLINE, RTI_CONTACT
    channel_value = Column(String(255), nullable=False)
    display_label_en = Column(String(255), nullable=True)
    display_label_ta = Column(String(255), nullable=True)
    is_verified = Column(Boolean, default=True)
    verification_date = Column(String(50), nullable=True)

    position = relationship("Position", back_populates="contact_channels")
    office = relationship("Office", back_populates="contact_channels")


class ReportingRelationship(Base):
    __tablename__ = "reporting_relationships"

    rel_id = Column(String(64), primary_key=True, default=generate_uuid)
    superior_position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=False)
    subordinate_position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=False)
    relationship_type = Column(String(50), default="DIRECT")  # DIRECT, ADMINISTRATIVE, FUNCTIONAL
    effective_from = Column(String(50), nullable=False)
    effective_to = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)


class SourceDocument(Base):
    __tablename__ = "source_documents"

    source_id = Column(String(64), primary_key=True, default=generate_uuid)
    org_name = Column(String(255), nullable=False)
    source_url = Column(String(500), nullable=False)
    source_type = Column(String(100), nullable=False)  # GOVERNMENT_WEBPAGE, PDF_DIRECTORY, GAZETTE_GO, OFFICIAL_API, ADMINISTRATIVE_UPLOAD
    data_category = Column(String(100), nullable=False)
    retrieval_method = Column(String(100), default="AUTOMATED_SCRAPE")
    retrieval_timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    publication_date = Column(String(50), nullable=True)
    content_hash = Column(String(128), nullable=True)
    verification_status = Column(String(50), default="VERIFIED")
    last_successful_retrieval = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    failure_reason = Column(Text, nullable=True)
    responsible_owner = Column(String(255), default="TNeGA State Data Nodal Officer")

    evidences = relationship("SourceEvidence", back_populates="source_doc")


class SourceEvidence(Base):
    __tablename__ = "source_evidence"

    evidence_id = Column(String(64), primary_key=True, default=generate_uuid)
    source_id = Column(String(64), ForeignKey("source_documents.source_id"), nullable=False)
    entity_type = Column(String(50), nullable=False)  # POSITION_ASSIGNMENT, OFFICIAL_CONTACT, OFFICE
    entity_id = Column(String(64), nullable=False)
    extracted_text = Column(Text, nullable=False)
    page_number = Column(Integer, nullable=True)
    bounding_box_json = Column(Text, nullable=True)
    confidence_score = Column(Float, default=1.0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    source_doc = relationship("SourceDocument", back_populates="evidences")


class VerificationRecord(Base):
    __tablename__ = "verification_records"

    verification_id = Column(String(64), primary_key=True, default=generate_uuid)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(String(64), nullable=False)
    verifier_user_id = Column(String(100), nullable=False)
    verifier_role = Column(String(100), nullable=False)
    verification_status = Column(String(50), nullable=False)  # VERIFIED, REJECTED, NEEDS_CORRECTION
    notes = Column(Text, nullable=True)
    verified_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class ChangeRequest(Base):
    __tablename__ = "change_requests"

    request_id = Column(String(64), primary_key=True, default=generate_uuid)
    change_type = Column(String(50), nullable=False)  # NEW_ASSIGNMENT, TRANSFER, VACANCY, ADDITIONAL_CHARGE, CONTACT_UPDATE
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=False)
    position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=True)
    person_id = Column(String(64), ForeignKey("persons.person_id"), nullable=True)
    payload_json = Column(Text, nullable=False)
    effective_date = Column(String(50), nullable=False)
    go_reference = Column(String(100), nullable=False)
    status = Column(String(50), default="DRAFT")  # DRAFT, PENDING_VERIFICATION, VERIFIED, PENDING_APPROVAL, APPROVED, REJECTED
    requested_by = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    workflows = relationship("ApprovalWorkflow", back_populates="request")


class ApprovalWorkflow(Base):
    __tablename__ = "approval_workflows"

    workflow_id = Column(String(64), primary_key=True, default=generate_uuid)
    request_id = Column(String(64), ForeignKey("change_requests.request_id"), nullable=False)
    step_number = Column(Integer, default=1)
    assigned_role = Column(String(100), nullable=False)
    action_taken = Column(String(50), nullable=False)  # SUBMIT, VERIFY, APPROVE, REJECT, REQUEST_CORRECTION
    actor_id = Column(String(100), nullable=False)
    comments = Column(Text, nullable=True)
    action_timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    request = relationship("ChangeRequest", back_populates="workflows")


class AuditEvent(Base):
    __tablename__ = "audit_events"

    event_id = Column(String(64), primary_key=True, default=generate_uuid)
    event_type = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(String(64), nullable=False)
    actor_id = Column(String(100), nullable=False)
    actor_role = Column(String(100), nullable=False)
    ip_address = Column(String(50), default="127.0.0.1")
    details_json = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class DepartmentNodalOfficer(Base):
    __tablename__ = "department_nodal_officers"

    nodal_id = Column(String(64), primary_key=True, default=generate_uuid)
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=False)
    person_id = Column(String(64), ForeignKey("persons.person_id"), nullable=False)
    official_email = Column(String(255), nullable=False)
    official_phone = Column(String(50), nullable=True)
    role = Column(String(50), default="EDITOR")  # EDITOR, VERIFIER, APPROVER
    is_active = Column(Boolean, default=True)

    department = relationship("Department", back_populates="nodal_officers")


# Reusable citizen services and government document entities (preserved)
class Service(Base):
    __tablename__ = "services"

    service_id = Column(String(64), primary_key=True)
    service_name_en = Column(String(255), nullable=False)
    service_name_ta = Column(String(255), nullable=False)
    department_owner = Column(String(255), nullable=False)
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=True)
    citizen_category = Column(String(255), nullable=False)
    eligibility_rules = Column(Text, nullable=True)
    required_docs = Column(Text, nullable=True)
    statutory_sla_days = Column(Integer, default=15)
    service_channel = Column(String(100), default="Online (e-Sevai)")
    action_url = Column(String(255), nullable=True)
    fees = Column(String(100), default="₹60 (Statutory)")
    responsible_position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=True)


class Scheme(Base):
    __tablename__ = "schemes"

    scheme_id = Column(String(64), primary_key=True)
    scheme_name_en = Column(String(255), nullable=False)
    scheme_name_ta = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # Education, Agriculture, Women, Health, Pensions
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=True)
    department_name = Column(String(255), nullable=False)
    target_beneficiaries = Column(Text, nullable=True)
    eligibility_criteria = Column(Text, nullable=True)
    benefits_provided = Column(Text, nullable=True)
    required_documents = Column(Text, nullable=True)
    application_method = Column(String(100), default="Online (e-Sevai) / District Office")
    official_portal_url = Column(String(500), nullable=True)
    responsible_position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=True)
    status = Column(String(50), default="ACTIVE")
    source_url = Column(String(500), nullable=True)
    last_verified = Column(String(50), default="2026-11-17")


class Document(Base):
    __tablename__ = "documents"

    doc_id = Column(String(64), primary_key=True)
    doc_type = Column(String(100), nullable=False)
    department = Column(String(255), nullable=False)
    subject_en = Column(Text, nullable=False)
    subject_ta = Column(Text, nullable=False)
    date_issued = Column(String(50), nullable=False)
    year = Column(String(10), nullable=False)
    file_url = Column(String(255), nullable=False)
    is_machine_readable = Column(Boolean, default=True)
    status = Column(String(50), default="ACTIVE")  # ACTIVE, SUPERSEDED
    raw_text = Column(Text, nullable=True)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    chunk_id = Column(String(64), primary_key=True, default=generate_uuid)
    doc_id = Column(String(64), ForeignKey("documents.doc_id"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content_en = Column(Text, nullable=False)
    content_ta = Column(Text, nullable=True)
    token_count = Column(Integer, default=0)
    embedding_json = Column(Text, nullable=True)
    status = Column(String(50), default="ACTIVE")
    source_url = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    document = relationship("Document", back_populates="chunks")
