import math
import re
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from db.models import DocumentChunk
from .embeddings import MultilingualEmbeddingService


class BM25Okapi:
    """
    BM25 text ranking algorithm for Tamil and English tokens.
    """

    def __init__(self, corpus: List[List[str]], k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.corpus_size = len(corpus)
        self.avg_dl = sum(len(doc) for doc in corpus) / self.corpus_size if self.corpus_size > 0 else 1.0
        self.doc_freqs: List[Dict[str, int]] = []
        self.idf: Dict[str, float] = {}
        self.doc_lens = [len(doc) for doc in corpus]

        df: Dict[str, int] = {}
        for doc in corpus:
            frequencies: Dict[str, int] = {}
            for term in doc:
                frequencies[term] = frequencies.get(term, 0) + 1
            self.doc_freqs.append(frequencies)
            for term in frequencies:
                df[term] = df.get(term, 0) + 1

        for term, freq in df.items():
            self.idf[term] = math.log(1 + (self.corpus_size - freq + 0.5) / (freq + 0.5))

    def get_scores(self, query: List[str]) -> List[float]:
        scores = [0.0] * self.corpus_size
        for q in query:
            if q not in self.idf:
                continue
            idf = self.idf[q]
            for idx, doc_freq in enumerate(self.doc_freqs):
                tf = doc_freq.get(q, 0)
                if tf == 0:
                    continue
                doc_len = self.doc_lens[idx]
                numerator = tf * (self.k1 + 1)
                denominator = tf + self.k1 * (1 - self.b + self.b * (doc_len / self.avg_dl))
                scores[idx] += idf * (numerator / denominator)
        return scores


class HybridSearchService:
    """
    Hybrid Search combining BM25 keyword matching + pgvector cosine similarity.
    Enforces active-only filtering (status == 'ACTIVE') and fallback threshold < 0.72.
    """

    def __init__(self, embedding_service: Optional[MultilingualEmbeddingService] = None):
        self.embedding_service = embedding_service or MultilingualEmbeddingService()
        self.similarity_threshold = 0.72

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r"[\u0B80-\u0BFA\w]+", text.lower(), re.UNICODE)

    def search(
        self,
        query: str,
        db: Session,
        limit: int = 5,
        alpha: float = 0.5,
    ) -> Dict[str, Any]:
        """
        Executes hybrid search across DocumentChunk table.
        alpha = weight for BM25 (0.0 to 1.0). 1 - alpha = weight for vector similarity.
        """
        # 1. Fetch only ACTIVE chunks (ensures outdated/superseded G.O.s are excluded)
        chunks = (
            db.query(DocumentChunk)
            .filter(DocumentChunk.status == "ACTIVE")
            .all()
        )

        if not chunks:
            return {
                "count": 0,
                "mode": "empty",
                "results": [],
                "top_similarity": 0.0,
            }

        # 2. Vector search scoring
        query_vec = self.embedding_service.get_embedding(query)
        vector_scores = []
        for ch in chunks:
            if ch.embedding_json:
                ch_vec = self.embedding_service.deserialize(ch.embedding_json)
                sim = self.embedding_service.cosine_similarity(query_vec, ch_vec)
            else:
                sim = 0.0
            vector_scores.append(sim)

        max_vector_sim = max(vector_scores) if vector_scores else 0.0

        # Check threshold fallback: if top similarity < 0.72, fallback to pure keyword search
        used_fallback = max_vector_sim < self.similarity_threshold
        effective_alpha = 1.0 if used_fallback else alpha

        # 3. BM25 keyword scoring
        corpus = [self._tokenize(ch.content_en + " " + (ch.content_ta or "")) for ch in chunks]
        query_tokens = self._tokenize(query)
        bm25 = BM25Okapi(corpus)
        raw_bm25_scores = bm25.get_scores(query_tokens)

        # Normalize BM25 scores between 0.0 and 1.0
        max_bm25 = max(raw_bm25_scores) if raw_bm25_scores else 0.0
        normalized_bm25 = [
            (score / max_bm25) if max_bm25 > 0 else 0.0
            for score in raw_bm25_scores
        ]

        # 4. Fusion of scores
        scored_results = []
        for idx, ch in enumerate(chunks):
            v_score = vector_scores[idx]
            b_score = normalized_bm25[idx]
            combined = (effective_alpha * b_score) + ((1.0 - effective_alpha) * v_score)

            if combined > 0.01:
                scored_results.append({
                    "chunk_id": ch.chunk_id,
                    "doc_id": ch.doc_id,
                    "chunk_index": ch.chunk_index,
                    "content": ch.content_en,
                    "content_ta": ch.content_ta,
                    "source_url": ch.source_url,
                    "status": ch.status,
                    "bm25_score": round(b_score, 4),
                    "vector_similarity": round(v_score, 4),
                    "hybrid_score": round(combined, 4),
                })

        # Sort descending by hybrid_score
        scored_results.sort(key=lambda x: x["hybrid_score"], reverse=True)
        top_results = scored_results[:limit]

        return {
            "count": len(top_results),
            "search_mode": "keyword_fallback (similarity < 0.72)" if used_fallback else "hybrid_fusion",
            "top_similarity": round(max_vector_sim, 4),
            "similarity_threshold": self.similarity_threshold,
            "results": top_results,
        }
