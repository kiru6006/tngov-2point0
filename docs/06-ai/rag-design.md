# Retrieval-Augmented Generation (RAG) Architecture

1. **Ingestion & OCR Pipeline**:
   - Automated pull of newly published G.O.s and Policy Notes.
   - Tesseract/PaddleOCR for scanned bilingual documents.
   - Text extraction flagged with `is_machine_readable = true`.
2. **Chunking & Vectorization**:
   - 512-token chunks with 64-token overlap.
   - Multilingual vector embedding (Tamil + English).
3. **Guardrails & Hallucination Prevention**:
   - Vector search restricted to documents marked `Status: Active`.
   - LLM instructed strictly to extract from retrieved context.
   - Every AI answer must link source G.O. / Scheme page URL.
   - Fallback to keyword search when similarity threshold < 0.72.
