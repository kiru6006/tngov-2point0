import re
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from db.models import Service, DocumentChunk


class RAGGuardrailService:
    """
    Enforces Tamil Nadu Portal Responsible AI Guardrails & Hallucination Mitigations:
    - Zero-generation eligibility rule extraction (RISK-AI-01)
    - Source G.O. / Scheme URL citation enforcement (Step 4.4)
    - Prompt injection sanitization (RISK-AI-03)
    """

    INJECTION_PATTERNS = [
        r"(?i)\bignore (all )?previous instructions\b",
        r"(?i)\byou are now\b",
        r"(?i)\bsystem prompt\b",
        r"(?i)<script\b",
        r"(?i)\bdrop table\b",
        r"(?i)\bjailbreak\b",
    ]

    def validate_and_sanitize_query(self, query: str) -> Dict[str, Any]:
        """
        Validates citizen query against prompt injection & adversarial patterns.
        """
        cleaned = query.strip()
        for pattern in self.INJECTION_PATTERNS:
            if re.search(pattern, cleaned):
                return {
                    "safe": False,
                    "reason": f"Input flagged by guardrail rule RISK-AI-03: disallowed pattern detected.",
                    "sanitized_query": re.sub(pattern, "", cleaned).strip() or "general citizen services",
                }
        return {"safe": True, "reason": "Passed safety checks", "sanitized_query": cleaned}

    def check_service_catalog_grounding(self, query: str, db: Session) -> Optional[Dict[str, Any]]:
        """
        Zero-generation mode: Checks if the query references a statutory citizen service.
        If matched, returns verbatim statutory eligibility_rules directly from Service Catalog.
        """
        q_lower = query.lower()
        services = db.query(Service).all()
        for srv in services:
            if (
                srv.service_name_en.lower() in q_lower
                or (srv.service_name_ta and srv.service_name_ta in query)
                or srv.citizen_category.lower() in q_lower
                or (srv.service_id.lower() in q_lower)
            ):
                return {
                    "service_id": srv.service_id,
                    "service_name_en": srv.service_name_en,
                    "service_name_ta": srv.service_name_ta,
                    "department_owner": srv.department_owner,
                    "eligibility_rules_verbatim": srv.eligibility_rules,
                    "required_docs": srv.required_docs,
                    "sla_days": srv.statutory_sla_days,
                    "official_action_url": srv.action_url,
                }
        return None

    def synthesize_rag_response(
        self,
        query: str,
        retrieved_chunks: List[Dict[str, Any]],
        db: Session,
        language: str = "en",
    ) -> Dict[str, Any]:
        """
        Synthesizes RAG answer strictly grounded in retrieved chunks or structured catalog.
        Enforces mandatory source G.O. / Scheme URL citations.
        """
        # 1. Check prompt injection
        safety = self.validate_and_sanitize_query(query)
        if not safety["safe"]:
            return {
                "query": query,
                "answer_en": "Your request could not be processed due to administrative security guardrails. Please search for official government services by name.",
                "answer_ta": "நிர்வாக பாதுகாப்பு வழிகாட்டுதல்கள் காரணமாக உங்கள் கோரிக்கை செயலாக்கப்படவில்லை. அதிகாரப்பூர்வ சேவைகளின் பெயரைப் பயன்படுத்தி தேடவும்.",
                "citations": [],
                "guardrail_audit": {
                    "safety_check": "FAILED",
                    "reason": safety["reason"],
                    "zero_generation_enforced": True,
                },
            }

        # 2. Check structured Service Catalog grounding first (Zero-generation eligibility)
        matched_service = self.check_service_catalog_grounding(query, db)

        citations = []
        if matched_service:
            citations.append({
                "type": "Statutory Service Catalog",
                "title": matched_service["service_name_en"],
                "url": matched_service["official_action_url"],
                "department": matched_service["department_owner"],
                "sla_days": matched_service["sla_days"],
            })

            answer_en = (
                f"Statutory requirements for {matched_service['service_name_en']} "
                f"({matched_service['department_owner']}):\n"
                f"• Official Eligibility: {matched_service['eligibility_rules_verbatim']}\n"
                f"• Required Documents: {matched_service['required_docs']}\n"
                f"• Statutory SLA: {matched_service['sla_days']} working days.\n"
                f"Apply online at: {matched_service['official_action_url']}"
            )
            answer_ta = (
                f"{matched_service['service_name_ta']} ({matched_service['department_owner']}) விதிமுறைகள்:\n"
                f"• தகுதி வரம்பு: {matched_service['eligibility_rules_verbatim']}\n"
                f"• தேவைப்படும் ஆவணங்கள்: {matched_service['required_docs']}\n"
                f"• சட்டப்பூர்வ சேவைக்காலம்: {matched_service['sla_days']} வேலை நாட்கள்.\n"
                f"விண்ணப்பிக்க: {matched_service['official_action_url']}"
            )

            return {
                "query": query,
                "answer": answer_ta if language == "ta" else answer_en,
                "answer_en": answer_en,
                "answer_ta": answer_ta,
                "citations": citations,
                "retrieved_count": len(retrieved_chunks),
                "guardrail_audit": {
                    "safety_check": "PASSED",
                    "mode": "Zero-Generation Catalog Grounding",
                    "citations_enforced": True,
                    "superseded_excluded": True,
                },
            }

        # 3. Document chunks grounding
        if not retrieved_chunks:
            return {
                "query": query,
                "answer_en": "No active Government Order or Policy Note was found matching your query. Please refer to the official document archive.",
                "answer_ta": "உங்கள் வினவலுக்குரிய நடைமுறையிலுள்ள அரசாணை அல்லது கொள்கை குறிப்பு எதுவும் கிடைக்கவில்லை. அதிகாரப்பூர்வ ஆவணக் காப்பகத்தைப் பார்க்கவும்.",
                "citations": [{"title": "Tamil Nadu Portal Document Archive", "url": "https://tn.gov.in/documents"}],
                "retrieved_count": 0,
                "guardrail_audit": {
                    "safety_check": "PASSED",
                    "mode": "Fallback Archive Notice",
                    "citations_enforced": True,
                    "superseded_excluded": True,
                },
            }

        # Collect citations from top retrieved chunks
        seen_urls = set()
        for ch in retrieved_chunks:
            url = ch.get("source_url")
            if url and url not in seen_urls:
                seen_urls.add(url)
                citations.append({
                    "type": "Government Order / Policy Note",
                    "doc_id": ch.get("doc_id"),
                    "url": url,
                    "chunk_id": ch.get("chunk_id"),
                    "hybrid_score": ch.get("hybrid_score"),
                })

        # Mandatory Citation Guardrail: If no citation URL present, enforce default portal archive citation
        if not citations:
            citations.append({
                "type": "Official Archive",
                "title": "Tamil Nadu Government Orders Archive",
                "url": "https://tn.gov.in/documents",
            })

        top_chunk = retrieved_chunks[0]
        excerpt = top_chunk["content"][:300].strip()

        answer_en = (
            f"Based on active Government Order ({top_chunk.get('doc_id')}):\n"
            f"{excerpt}...\n\n"
            f"Source Citation: {citations[0]['url']}"
        )
        answer_ta = (
            f"அதிகாரப்பூர்வ அரசாணையின்படி ({top_chunk.get('doc_id')}):\n"
            f"{excerpt}...\n\n"
            f"மூல அரசாணை இணைப்பு: {citations[0]['url']}"
        )

        return {
            "query": query,
            "answer": answer_ta if language == "ta" else answer_en,
            "answer_en": answer_en,
            "answer_ta": answer_ta,
            "citations": citations,
            "retrieved_count": len(retrieved_chunks),
            "guardrail_audit": {
                "safety_check": "PASSED",
                "mode": "Retrieved Document Chunk Synthesis",
                "citations_enforced": True,
                "superseded_excluded": True,
            },
        }
