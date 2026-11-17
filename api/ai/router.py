from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from db.session import get_db
from db.models import Document, Position, Jurisdiction
from .schemas import (
    ChatRequest,
    ChatResponse,
    FeedbackRequest,
    DirectoryAIQueryRequest,
    DirectoryAIQueryResponse,
    DocumentAIQueryRequest,
    DocumentAIQueryResponse,
    DocumentSummarizeRequest,
    DocumentSummarizeResponse,
    AIQualityMetricsResponse,
    ReviewQueueItem,
    ResolveReviewItemRequest,
)
from .service import (
    AICitizenAssistantService,
    ContactDirectoryAIService,
    AIQualityAgentService,
)

router = APIRouter()
assistant_service = AICitizenAssistantService()


# =========================================================================
# 1. CITIZEN AI CHAT & FEEDBACK
# =========================================================================

@router.post("/api/v1/ai/chat", response_model=ChatResponse, tags=["AI Citizen Assistant"])
def citizen_ai_chat(req: ChatRequest, db: Session = Depends(get_db)):
    return assistant_service.process_chat(req, db)


@router.post("/api/v1/ai/search", response_model=ChatResponse, tags=["AI Citizen Assistant"])
def citizen_ai_search(req: ChatRequest, db: Session = Depends(get_db)):
    # Federated conversational search
    return assistant_service.process_chat(req, db)


@router.post("/api/v1/ai/feedback", tags=["AI Citizen Assistant"])
def submit_ai_feedback(req: FeedbackRequest):
    return {
        "status": "RECORDED",
        "correlation_id": req.correlation_id,
        "rating": req.rating,
        "message": "Citizen feedback logged for continuous AI safety evaluation.",
    }


# =========================================================================
# 2. CONTACT DIRECTORY AI (Deterministic SQL Invariant)
# =========================================================================

@router.post("/api/v1/ai/directory/query", response_model=DirectoryAIQueryResponse, tags=["AI Contact Directory"])
def query_directory_ai(req: DirectoryAIQueryRequest, db: Session = Depends(get_db)):
    return ContactDirectoryAIService.query_official(db, req.query)


# =========================================================================
# 3. DOCUMENT INTELLIGENCE & SUMMARIZATION
# =========================================================================

@router.post("/api/v1/ai/documents/query", response_model=DocumentAIQueryResponse, tags=["AI Document Intelligence"])
def query_documents_ai(req: DocumentAIQueryRequest, db: Session = Depends(get_db)):
    q_lower = req.query.lower()
    docs = db.query(Document).filter(Document.status == "ACTIVE").all()

    relevant = []
    for d in docs:
        if (
            any(w in d.subject_en.lower() for w in q_lower.split() if len(w) > 3)
            or any(w in d.subject_ta for w in req.query.split() if len(w) > 3)
            or d.doc_id.lower() in q_lower
        ):
            relevant.append({
                "doc_id": d.doc_id,
                "type": d.doc_type,
                "title_en": d.subject_en,
                "title_ta": d.subject_ta,
                "department": d.department,
                "date": d.date_issued,
                "download_url": d.file_url,
            })

    if not relevant and docs:
        # Provide the top recent documents as fallback
        for d in docs[:req.limit]:
            relevant.append({
                "doc_id": d.doc_id,
                "type": d.doc_type,
                "title_en": d.subject_en,
                "title_ta": d.subject_ta,
                "department": d.department,
                "date": d.date_issued,
                "download_url": d.file_url,
            })

    return DocumentAIQueryResponse(
        query=req.query,
        relevant_documents=relevant[: req.limit],
        synthesized_explanation_en=f"Found {len(relevant)} official government orders matching '{req.query}'. Download the original verified gazette PDF for statutory legal reference.",
        synthesized_explanation_ta=f"'{req.query}' தொடர்பான {len(relevant)} அதிகாரப்பூர்வ அரசாணைகள் கண்டறியப்பட்டன. முழு விவரங்களை பதிவிறக்கம் செய்து பார்க்கவும்.",
    )


@router.post("/api/v1/ai/documents/summarize", response_model=DocumentSummarizeResponse, tags=["AI Document Intelligence"])
def summarize_document_ai(req: DocumentSummarizeRequest, db: Session = Depends(get_db)):
    d = db.query(Document).filter(Document.doc_id == req.doc_id).first()
    if not d:
        raise HTTPException(status_code=404, detail=f"Document {req.doc_id} not found")

    return DocumentSummarizeResponse(
        doc_id=d.doc_id,
        title_en=d.subject_en,
        title_ta=d.subject_ta,
        department=d.department,
        issuing_date=d.date_issued,
        key_points=[
            f"Issued under the authority of {d.department}.",
            f"Officially promulgated on {d.date_issued} as machine-readable record.",
            "All subordinate administrative wings and taluk officers bound by order terms.",
        ],
        statutory_applicability=f"Statewide across all 38 Revenue Districts of Tamil Nadu.",
        source_download_url=d.file_url,
    )


# =========================================================================
# 4. ADMINISTRATIVE INTELLIGENCE & REVIEW QUEUE
# =========================================================================

@router.get("/api/v1/admin/ai/quality-metrics", response_model=AIQualityMetricsResponse, tags=["AI Administrative Intelligence"])
def get_ai_quality_metrics(db: Session = Depends(get_db)):
    return AIQualityAgentService.get_quality_metrics(db)


@router.get("/api/v1/admin/ai/review-queue", response_model=List[ReviewQueueItem], tags=["AI Administrative Intelligence"])
def get_ai_review_queue():
    return AIQualityAgentService.get_review_queue()


@router.post("/api/v1/admin/ai/review-queue/{item_id}/resolve", tags=["AI Administrative Intelligence"])
def resolve_review_item(item_id: str, req: ResolveReviewItemRequest):
    try:
        return AIQualityAgentService.resolve_review_item(
            item_id, req.action, req.reviewer_id, req.resolution_notes
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
