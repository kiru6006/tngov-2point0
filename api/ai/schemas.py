from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


# 1. Citizen AI Chat Schemas
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000, description="Citizen query in Tamil, English or mixed")
    language: str = Field(default="auto", description="'en', 'ta', or 'auto' for auto-detection")
    session_id: Optional[str] = Field(default=None, description="Optional conversation correlation ID")
    context_entity_type: Optional[str] = Field(default=None, description="SERVICE, SCHEME, DOCUMENT, DIRECTORY")


class CitationItem(BaseModel):
    title: str
    url: str
    source_type: str  # Statutory Service, Government Order, Gazette Registry, Official Scheme
    department: str
    verification_date: str = "2026-11-17"


class ChatResponse(BaseModel):
    query: str
    detected_language: str
    intent: str  # SERVICE_GUIDANCE, SCHEME_DISCOVERY, DIRECTORY_LOOKUP, DOCUMENT_INTELLIGENCE, GENERAL_QUERY
    answer_en: str
    answer_ta: str
    department: Optional[str] = None
    citations: List[CitationItem] = []
    action_url: Optional[str] = None
    action_label_en: Optional[str] = None
    action_label_ta: Optional[str] = None
    recommended_next_action: str
    safety_audit: Dict[str, Any] = {}
    correlation_id: str


class FeedbackRequest(BaseModel):
    correlation_id: str
    query: str
    rating: int = Field(..., ge=1, le=5, description="1 to 5 stars or thumbs (1=thumbs down, 5=thumbs up)")
    comment: Optional[str] = None


# 2. Contact Directory AI Query
class DirectoryAIQueryRequest(BaseModel):
    query: str = Field(..., description="e.g. Who is District Collector of Chennai? / Head of Highways Dept")
    designation: Optional[str] = None
    district: Optional[str] = None
    department: Optional[str] = None


class DirectoryAIQueryResponse(BaseModel):
    query: str
    position_title: str
    current_officeholder: str
    official_phone: Optional[str] = None
    official_email: Optional[str] = None
    office_address: Optional[str] = None
    department: str
    district: str
    appointment_go_ref: str
    is_vacant: bool
    verification_status: str
    verification_date: str
    source_citation: str
    deterministic_sql_verified: bool = True


# 3. Document Intelligence Query & Summarization
class DocumentAIQueryRequest(BaseModel):
    query: str = Field(..., description="e.g. compensation under land acquisition act")
    year: Optional[str] = None
    department: Optional[str] = None
    limit: int = Field(default=3, ge=1, le=10)


class DocumentAIQueryResponse(BaseModel):
    query: str
    relevant_documents: List[Dict[str, Any]]
    synthesized_explanation_en: str
    synthesized_explanation_ta: str
    legal_disclaimer: str = "Statutory text grounded in official Government Orders. AI does not render legal counsel."


class DocumentSummarizeRequest(BaseModel):
    doc_id: str = Field(..., description="Document ID e.g. TN-GO-REV-2025-128")
    language: str = Field(default="en")


class DocumentSummarizeResponse(BaseModel):
    doc_id: str
    title_en: str
    title_ta: str
    department: str
    issuing_date: str
    key_points: List[str]
    statutory_applicability: str
    source_download_url: str


# 4. Administrative AI Quality & Review Queue
class AIQualityMetricsResponse(BaseModel):
    total_queries_processed: int
    citation_coverage_rate_pct: float
    unsupported_answer_rate_pct: float
    prompt_injection_blocked_count: int
    tamil_query_ratio_pct: float
    average_latency_ms: float
    active_review_queue_items: int
    ai_pilot_status: str = "ACTIVE_PILOT"
    computed_at: str


class ReviewQueueItem(BaseModel):
    item_id: str
    detection_category: str  # POTENTIAL_OUTDATED_OFFICER, CONFLICTING_PHONE, MISSING_TRANSLATION, UNVERIFIED_REQUIREMENT
    entity_type: str
    entity_id: str
    description: str
    confidence_score: float
    proposed_correction: str
    status: str = "PENDING_HUMAN_REVIEW"  # PENDING_HUMAN_REVIEW, RESOLVED, DISMISSED
    detected_at: str


class ResolveReviewItemRequest(BaseModel):
    action: str = Field(..., description="APPROVE_CORRECTION, DISMISS, REQUEST_AUDIT")
    reviewer_id: str
    resolution_notes: str
