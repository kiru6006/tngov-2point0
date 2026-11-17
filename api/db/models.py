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
)
from sqlalchemy.orm import relationship
from .session import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class Department(Base):
    __tablename__ = "departments"

    department_id = Column(String(64), primary_key=True, default=generate_uuid)
    name_en = Column(String(255), nullable=False)
    name_ta = Column(String(255), nullable=False)
    code = Column(String(50), nullable=True)

    positions = relationship("Position", back_populates="department")


class Jurisdiction(Base):
    __tablename__ = "jurisdictions"

    jurisdiction_id = Column(String(64), primary_key=True, default=generate_uuid)
    district_en = Column(String(255), nullable=False)
    district_ta = Column(String(255), nullable=False)
    level = Column(String(50), default="District")

    positions = relationship("Position", back_populates="jurisdiction")


class Position(Base):
    __tablename__ = "positions"

    position_id = Column(String(64), primary_key=True, default=generate_uuid)
    title_en = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=False)
    department_id = Column(String(64), ForeignKey("departments.department_id"), nullable=False)
    jurisdiction_id = Column(String(64), ForeignKey("jurisdictions.jurisdiction_id"), nullable=False)
    reports_to_position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=True)
    cadre = Column(String(50), nullable=False)  # IAS, DRO, State Cadre
    status = Column(String(50), default="active")  # active, vacant, abolished

    department = relationship("Department", back_populates="positions")
    jurisdiction = relationship("Jurisdiction", back_populates="positions")
    assignments = relationship("PositionAssignment", back_populates="position")


class Person(Base):
    __tablename__ = "persons"

    person_id = Column(String(64), primary_key=True, default=generate_uuid)
    name_en = Column(String(255), nullable=False)
    name_ta = Column(String(255), nullable=False)
    official_email = Column(String(255), nullable=True)
    official_phone = Column(String(50), nullable=True)
    office_address = Column(String(255), nullable=True)
    verification_status = Column(String(50), default="verified")  # verified, pending, disputed

    assignments = relationship("PositionAssignment", back_populates="person")


class PositionAssignment(Base):
    __tablename__ = "position_assignments"

    assignment_id = Column(String(64), primary_key=True, default=generate_uuid)
    position_id = Column(String(64), ForeignKey("positions.position_id"), nullable=False)
    person_id = Column(String(64), ForeignKey("persons.person_id"), nullable=False)
    start_date = Column(String(50), nullable=False)
    end_date = Column(String(50), nullable=True)
    transfer_go_ref = Column(String(100), nullable=False)
    is_current = Column(Boolean, default=True)
    workflow_status = Column(String(50), default="APPROVED")  # DRAFT, PENDING_REVIEW, APPROVED, DISPUTED
    submitted_by = Column(String(100), nullable=True)
    approved_by = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    position = relationship("Position", back_populates="assignments")
    person = relationship("Person", back_populates="assignments")


class Service(Base):
    __tablename__ = "services"

    service_id = Column(String(64), primary_key=True)
    service_name_en = Column(String(255), nullable=False)
    service_name_ta = Column(String(255), nullable=False)
    department_owner = Column(String(255), nullable=False)
    citizen_category = Column(String(255), nullable=False)
    eligibility_rules = Column(Text, nullable=True)
    required_docs = Column(Text, nullable=True)
    statutory_sla_days = Column(Integer, default=15)
    service_channel = Column(String(100), default="Online (e-Sevai)")
    action_url = Column(String(255), nullable=True)


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
    embedding_json = Column(Text, nullable=True)  # JSON-encoded float vector
    status = Column(String(50), default="ACTIVE")  # ACTIVE, SUPERSEDED
    source_url = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    document = relationship("Document", back_populates="chunks")
