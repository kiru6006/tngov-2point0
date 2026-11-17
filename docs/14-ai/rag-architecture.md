# RAG Architecture: Tamil Nadu Government Orders & Schemes

## 1. Document Ingestion & Chunking Strategy
- **Chunk Size**: 512 tokens with 64-token sliding overlap.
- **Header Injection**: Every chunk prepends document metadata (`[G.O. No: {doc_number} | Dept: {dept} | Date: {date} | Status: {status}]`).
- **Superseded Filter**: Inverted index filters out documents marked `status = 'SUPERSEDED'`.

## 2. Hybrid Retrieval Pipeline
- **Lexical Search (BM25)**: Matches exact legal terms, GO numbers (e.g., `G.O. Ms. No. 128`), and Tamil administrative jargon.
- **Dense Vector Search**: Multilingual sentence embeddings (cosine distance $\le 0.35$).
- **Reciprocal Rank Fusion (RRF)**:
  $$RRF\_Score(d) = \sum_{m \in \{dense, sparse\}} \frac{1}{60 + rank_m(d)}$$

## 3. Grounded Synthesis & Citations
- Verbatim extraction required for legal stipulations, application fees, and SLA periods.
- Every factual sentence references an official source URI and document number.
