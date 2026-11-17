from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


# 1. Citizen Services Schemas
class ServiceDetailResponse(BaseModel):
    service_id: str
    service_name_en: str
    service_name_ta: str
    department_owner: str
    department_id: Optional[str] = None
    citizen_category: str
    eligibility_rules: Optional[str] = None
    required_docs: Optional[str] = None
    statutory_sla_days: int = 15
    service_channel: str = "Online (e-Sevai)"
    action_url: Optional[str] = None
    fees: str = "₹60 (Statutory)"
    responsible_position_id: Optional[str] = None
    responsible_official_name: Optional[str] = None
    responsible_official_phone: Optional[str] = None
    tracking_supported: bool = True
    tracking_url: str = "/status"


class ServiceListResponse(BaseModel):
    total: int = 0
    count: int = 0
    services: List[ServiceDetailResponse]


# 2. Government Schemes Schemas
class SchemeDetailResponse(BaseModel):
    scheme_id: str
    scheme_name_en: str
    scheme_name_ta: str
    category: str
    department_name: str
    department_id: Optional[str] = None
    target_beneficiaries: Optional[str] = None
    eligibility_criteria: Optional[str] = None
    benefits_provided: Optional[str] = None
    required_documents: Optional[str] = None
    application_method: str
    official_portal_url: Optional[str] = None
    status: str = "ACTIVE"
    source_url: Optional[str] = None
    last_verified: str = "2026-11-17"
    responsible_position_id: Optional[str] = None
    responsible_official_name: Optional[str] = None


class SchemeListResponse(BaseModel):
    total: int = 0
    count: int = 0
    schemes: List[SchemeDetailResponse]


# 3. Government Documents Schemas
class DocumentDetailResponse(BaseModel):
    doc_id: str
    doc_type: str
    department: str
    subject_en: str
    subject_ta: str
    date_issued: str
    year: str
    file_url: str
    is_machine_readable: bool = True
    status: str = "ACTIVE"
    content_hash: Optional[str] = None
    last_verified: str = "2026-11-17"


class DocumentListResponse(BaseModel):
    total: int = 0
    count: int = 0
    documents: List[DocumentDetailResponse]


# 4. Unified Search Schemas
class SearchResultItem(BaseModel):
    id: str
    title_en: str
    title_ta: str
    entity_type: str  # SERVICE, SCHEME, DOCUMENT, DEPARTMENT, DISTRICT, CONTACT, OFFICE
    department: Optional[str] = None
    district: Optional[str] = None
    description_en: str
    description_ta: Optional[str] = None
    action_url: str
    action_label_en: str
    action_label_ta: str
    verification_status: str = "VERIFIED"
    relevance_score: float = 1.0


class UnifiedSearchResponse(BaseModel):
    query: str
    total: int
    page: int
    limit: int
    results: List[SearchResultItem]
    facets: Dict[str, int] = {}


class SearchSuggestionsResponse(BaseModel):
    query: str
    suggestions: List[str]
