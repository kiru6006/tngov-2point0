from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


# 1. Contact / Official Schemas
class ContactChannelSchema(BaseModel):
    channel_id: str
    channel_type: str
    channel_value: str
    display_label_en: Optional[str] = None
    display_label_ta: Optional[str] = None
    is_verified: bool = True
    verification_date: Optional[str] = None


class ContactDetail(BaseModel):
    id: str
    position_id: str
    designation_en: str
    designation_ta: str
    department_id: str
    department_en: str
    department_ta: str
    office_id: Optional[str] = None
    office_en: Optional[str] = None
    office_ta: Optional[str] = None
    district_en: str
    district_ta: str
    cadre: str
    is_vacant: bool = False
    person_id: Optional[str] = None
    name_en: Optional[str] = None
    name_ta: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    office_address: Optional[str] = None
    status: str = "Active"
    workflow_status: str = "APPROVED"
    verified: bool = True
    go_ref: Optional[str] = None
    last_verified: Optional[str] = None
    channels: List[ContactChannelSchema] = []
    source_reference: Optional[str] = None


class ContactListResponse(BaseModel):
    total: int
    page: int
    limit: int
    officials: List[ContactDetail]


# 2. Departments & Offices
class DepartmentSchema(BaseModel):
    department_id: str
    name_en: str
    name_ta: str
    code: Optional[str] = None
    category_id: Optional[str] = None
    total_positions: int = 0
    vacant_positions: int = 0


class OfficeSchema(BaseModel):
    office_id: str
    department_id: str
    name_en: str
    name_ta: str
    office_type: str
    jurisdiction_en: Optional[str] = None
    address_en: Optional[str] = None
    status: str = "active"


class DistrictSchema(BaseModel):
    jurisdiction_id: str
    district_en: str
    district_ta: str
    level: str = "District"
    collector_name_en: Optional[str] = None
    collector_name_ta: Optional[str] = None
    collector_phone: Optional[str] = None
    collector_email: Optional[str] = None


class PositionSchema(BaseModel):
    position_id: str
    title_en: str
    title_ta: str
    department_id: str
    department_name: str
    office_id: Optional[str] = None
    office_name: Optional[str] = None
    district: str
    cadre: str
    sanctioned_strength: int = 1
    is_vacant: bool = False
    current_occupant_name: Optional[str] = None
    status: str = "active"


# 3. Hierarchy Tree
class HierarchyNode(BaseModel):
    node_id: str
    node_type: str  # Government, Department, Directorate, District Office, Position
    name_en: str
    name_ta: str
    department_name: Optional[str] = None
    office_name: Optional[str] = None
    position_title: Optional[str] = None
    current_officeholder: Optional[str] = None
    jurisdiction: Optional[str] = None
    status: str = "active"
    verification_status: str = "VERIFIED"
    children: List["HierarchyNode"] = []


# 4. Directory Categories
class CategorySchema(BaseModel):
    category_id: str
    name_en: str
    name_ta: str
    code: str
    icon: str = "Users"
    sort_order: int = 1


# 5. Change Requests & Approval Workflow
class ChangeRequestCreate(BaseModel):
    change_type: str = Field(..., description="NEW_ASSIGNMENT, TRANSFER, VACANCY, ADDITIONAL_CHARGE, CONTACT_UPDATE")
    department_id: str
    position_id: Optional[str] = None
    person_id: Optional[str] = None
    payload: Dict[str, Any] = Field(..., description="Arbitrary json payload describing changes")
    effective_date: str = Field(..., description="YYYY-MM-DD")
    go_reference: str
    requested_by: str = Field(default="Department Nodal Editor")


class ChangeRequestReview(BaseModel):
    action: str = Field(..., description="VERIFY, APPROVE, REJECT, REQUEST_CORRECTION")
    actor_id: str
    actor_role: str
    comments: Optional[str] = None


class ChangeRequestResponse(BaseModel):
    request_id: str
    change_type: str
    department_id: str
    position_id: Optional[str] = None
    person_id: Optional[str] = None
    effective_date: str
    go_reference: str
    status: str
    requested_by: str
    created_at: str
    updated_at: str
    workflows: List[Dict[str, Any]] = []


# 6. Transfer Management
class OfficerTransferRequest(BaseModel):
    person_id: str = Field(..., description="ID of the officer being transferred")
    current_position_id: str = Field(..., description="Position currently held to close or mark vacant")
    new_position_id: str = Field(..., description="Target destination position")
    transfer_type: str = Field(default="REGULAR_TRANSFER", description="REGULAR_TRANSFER, ADDITIONAL_CHARGE, ACTING")
    effective_date: str = Field(..., description="YYYY-MM-DD effective date")
    transfer_go_ref: str = Field(..., description="e.g. G.O.(Rt) No. 412 Public (Special.A) Dept")
    authorized_by: str = Field(default="Chief Secretary / Nodal Approver")
    close_previous_assignment: bool = Field(default=True, description="Mark previous position assignment as superseded/vacant")


class OfficerTransferResponse(BaseModel):
    success: bool
    message: str
    closed_assignment_id: Optional[str] = None
    new_assignment_id: str
    person_id: str
    previous_position_id: str
    new_position_id: str
    effective_date: str
    go_ref: str
    audit_event_id: str


# 7. Source Registry & Evidence
class SourceDocumentSchema(BaseModel):
    source_id: str
    org_name: str
    source_url: str
    source_type: str
    data_category: str
    retrieval_method: str
    publication_date: Optional[str] = None
    content_hash: Optional[str] = None
    verification_status: str
    last_successful_retrieval: Optional[str] = None
    responsible_owner: str


class SourceEvidenceSchema(BaseModel):
    evidence_id: str
    source_id: str
    entity_type: str
    entity_id: str
    extracted_text: str
    page_number: Optional[int] = None
    confidence_score: float = 1.0


# 8. Directory Data Quality Metrics
class DataQualityMetrics(BaseModel):
    total_published_positions: int
    verified_current_assignments: int
    vacant_positions: int
    missing_official_contacts: int
    records_awaiting_verification: int
    conflicting_records: int
    duplicate_candidates: int
    stale_records: int
    recent_transfers_30d: int
    departments_without_nodal: int
    source_retrieval_failures: int
    last_computed_at: str


class ConflictItem(BaseModel):
    conflict_id: str
    conflict_type: str  # DUAL_PRIMARY_ASSIGNMENT, MISSING_CONTACT, ORPHAN_POSITION, OUTDATED_VERIFICATION
    position_id: Optional[str] = None
    position_title: Optional[str] = None
    department: Optional[str] = None
    description: str
    severity: str = "HIGH"  # CRITICAL, HIGH, MEDIUM, LOW
    detected_at: str
