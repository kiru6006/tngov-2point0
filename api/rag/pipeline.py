import logging
from sqlalchemy.orm import Session
from db.models import Document, DocumentChunk
from .ocr_worker import OCRWorker
from .chunker import MultilingualChunker
from .embeddings import MultilingualEmbeddingService

logger = logging.getLogger(__name__)


def run_rag_indexing(db: Session) -> int:
    """
    Complete RAG indexing pipeline:
    1. Batch OCR / Text Extraction
    2. 512-token chunking with 64-token overlap
    3. Multilingual Vector Embedding Generation
    4. Database persistence in document_chunks
    """
    ocr_worker = OCRWorker()
    chunker = MultilingualChunker(chunk_size=512, chunk_overlap=64)
    embedder = MultilingualEmbeddingService(dimension=256)

    documents = db.query(Document).all()
    total_chunks_created = 0

    for doc in documents:
        # 1. OCR extraction if raw_text is missing
        if not doc.raw_text:
            ocr_worker.process_document(doc, db)

        # Remove previous chunks for clean re-indexing
        db.query(DocumentChunk).filter(DocumentChunk.doc_id == doc.doc_id).delete()

        # 2. Chunk text
        chunks_data = chunker.chunk_text(
            text=doc.raw_text or doc.subject_en,
            metadata={
                "doc_id": doc.doc_id,
                "source_url": doc.file_url,
                "status": doc.status or "ACTIVE",
            },
        )

        # 3. Vectorize and save
        for c in chunks_data:
            vec = embedder.get_embedding(c["content"])
            chunk_rec = DocumentChunk(
                doc_id=doc.doc_id,
                chunk_index=c["chunk_index"],
                content_en=c["content"],
                content_ta=doc.subject_ta,
                token_count=c["token_count"],
                embedding_json=embedder.serialize(vec),
                status=c["status"],
                source_url=c["source_url"],
            )
            db.add(chunk_rec)
            total_chunks_created += 1

    db.commit()
    logger.info("RAG Indexing complete: indexed %d chunks across %d documents", total_chunks_created, len(documents))
    return total_chunks_created
