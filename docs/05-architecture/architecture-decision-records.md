# Architecture Decision Records (ADRs)

## ADR-01: Decoupling Government Positions from Persons
- **Context**: Legacy government websites store official name and designation in a single record. When an official transfers, directories become outdated or lose historical continuity.
- **Decision**: Define `positions` as permanent statutory records. Define `persons` as distinct entities. Connect them via effective-dated `position_assignments` with Maker-Checker lifecycle states (`DRAFT`, `PENDING_REVIEW`, `APPROVED`, `DISPUTED`).
- **Consequences**: Transfers update assignments without breaking external URLs or hierarchy structures. Complete audit trail preserved.

## ADR-02: Zero-Generation RAG Guardrail for Citizen Eligibility
- **Context**: LLMs tend to hallucinate welfare scheme eligibility criteria, leading to public confusion or unlawful citizen expectations.
- **Decision**: Implement Zero-Generation mode (`RISK-AI-01`). For service inquiries, the AI assistant extracts statutory `eligibility_rules` verbatim from the structured Service Catalog without synthesizing qualification decisions.
- **Consequences**: 100% legal compliance; zero hallucinated qualifications. Mandatory source URL citations enforced.

## ADR-03: Modular Monolith over Microservices
- **Context**: Government digital platforms often suffer operational fragmentation when decomposed into premature microservices across departments.
- **Decision**: Build the core gateway as a Python FastAPI Modular Monolith with clean internal domain boundaries, deploying against a unified PostgreSQL instance with pgvector.
- **Consequences**: Drastically lower operational complexity, simple transaction consistency, easy state deployment, and straightforward containerization.

## ADR-04: Hybrid BM25 + Vector Semantic Search
- **Context**: Pure vector search can miss exact administrative order numbers (e.g. "G.O. Ms. No. 512"), while pure keyword search fails on colloquial citizen queries.
- **Decision**: Implement hybrid fusion combining BM25 lexical matching with 256-dimensional semantic vector similarity, with fallback to keyword search when similarity < 0.72.
- **Consequences**: Superior accuracy for both exact statutory numbers and natural language citizen queries.
