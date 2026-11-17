# Solution Architecture Document v1: Modular Monolith

## 1. High-Level System Architecture
The platform is designed as a **Modular Monolith** deployed within the Tamil Nadu State Data Centre (SDC).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER                               │
│  Next.js 16/19 App Router + React 19 + Tailwind v4 + Lucide React       │
│  (Static Export for GitHub Pages / SSR at SDC CDN Edge)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS / REST (JSON)
┌───────────────────────────────────▼────────────────────────────────────┐
│                       GATEWAY & ORCHESTRATION                          │
│  FastAPI (Python 3.12+) Gateway Layer                                  │
│  - CORS & Security Middleware (CSP, HSTS, X-Frame-Options)            │
│  - Role-Based Access Control (RBAC: Maker, Approver, Citizen)          │
│  - Universal Search & RAG Orchestration                                │
└───────────────────┬───────────────────────────────┬────────────────────┘
                    │                               │
┌───────────────────▼─────────────┐   ┌─────────────▼────────────────────┐
│       CORE MODULE ENGINES       │   │     DOCUMENT & AI PIPELINES      │
│ - Service Catalogue Engine      │   │ - OCR Worker (Tesseract/Paddle)  │
│ - Contact Directory & Maker-Chk │   │ - Multilingual Chunker (512 tok) │
│ - Application Tracking Proxy    │   │ - Vector Embedder (256-dim)      │
│ - Department/District Registry  │   │ - Hybrid Search (BM25 + Cosine)  │
└───────────────────┬─────────────┘   └─────────────┬────────────────────┘
                    │                               │
┌───────────────────▼───────────────────────────────▼────────────────────┐
│                          DATA PERSISTENCE                              │
│  PostgreSQL 16 Relational Engine + pgvector Semantic Extension         │
│  (Alembic Migration Tracked: departments, positions, persons,          │
│   position_assignments, services, documents, document_chunks)          │
└────────────────────────────────────────────────────────────────────────┘
```

## 2. Core Module Boundaries & Ownership
1. **Service Catalogue Module**: Exposes single, versioned REST endpoints (`/api/v1/services`) for all 250+ citizen services.
2. **P0 Contact Directory Module**: Implements permanent positions, transitory persons, effective-dated assignments, and Maker-Checker approval workflow.
3. **Application Tracking Proxy Module**: Receives citizen application IDs (`/api/v1/track/{app_id}`) and queries TNeGA e-Sevai status APIs.
4. **Document Registry & RAG Module**: Manages official G.O. PDFs, extracted text transcripts, and hybrid search index (`/api/v1/search/hybrid`, `/api/v1/rag/query`).

## 3. Security, Privacy & Compliance Boundaries
- **Zero Trust Network Access (ZTNA)**: Admin Maker-Checker endpoints restricted to authenticated intranet VPN and authorized role tokens.
- **Data Minimization (DPDP Act 2023)**: Tracking endpoints never log citizen Aadhaar, mobile numbers, or domestic addresses.
- **Sovereign Local Processing**: Vector embeddings and OCR operate entirely on State Data Centre hardware without cloud egress.
