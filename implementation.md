# Tamil Nadu Government Digital Portal 2.0 (tngov-2point0)
## Implementation Plan & Technical Approach

## 1. Architecture Baseline
- **Frontend**: Next.js 19 App Router (`/web`), Tailwind CSS v4, Lucide React, bilingual (Tamil/English), GIGW 3.0 / WCAG 2.2 AA.
- **Backend Gateway**: Python 3.12 FastAPI (`/api`) providing asynchronous REST proxies and mock integrations.
- **Data Stores**: PostgreSQL 16 (Relational position/person master, service catalog) + pgvector (Semantic RAG index).
- **Object Archive**: S3-compatible store for immutable G.O. & Policy Note PDFs.

---

## 2. Phased Implementation Breakdown

### Phase 1: Frontend Experience & Navigation (Weeks 1-4) [IN PROGRESS]
- [x] Step 1.1: Root project structure & canonical documentation index.
- [x] Step 1.2: Next.js citizen homepage (`/`) with 6 Life-Event service cards & SLA badges.
- [x] Step 1.3: Unified application tracking component with 4-stage review progress bar.
- [x] Step 1.4: P0 Government Contact Directory view (`/contact-directory`) with 4 interactive tabs.
- [ ] Step 1.5: Government Document & G.O. Search page (`/documents`) with Year/Department filters.
- [ ] Step 1.6: Service Details deep-view (`/services/[id]`) mapping statutory requirements & e-Sevai CTA.

### Phase 2: FastAPI Gateway Service (Weeks 5-8)
- [ ] Step 2.1: Initialize FastAPI project scaffold under `/api` with Poetry / Uvicorn.
- [ ] Step 2.2: Implement `GET /api/v1/services` and `GET /api/v1/services/{id}` from CSV/DB.
- [ ] Step 2.3: Implement `GET /api/v1/contacts` supporting filtering by name, cadre, department, district.
- [ ] Step 2.4: Implement `GET /api/v1/track/{app_id}` simulated proxy contract for TNeGA e-Sevai.
- [ ] Step 2.5: CORS & security headers configuration (CSP, HSTS, X-Frame-Options).

### Phase 3: Relational DB & Master Data Modeling (Weeks 9-12)
- [ ] Step 3.1: SQLAlchemy / Alembic migration scripts for `positions`, `persons`, `position_assignments`.
- [ ] Step 3.2: Ingestion pipeline loading `data/service-catalogue.csv` and `data/document-catalogue.csv`.
- [ ] Step 3.3: Maker-checker verification queue API (`POST /api/v1/admin/assignments`).

### Phase 4: OCR Pipeline & RAG Search (Weeks 13-16)
- [ ] Step 4.1: Batch OCR ingestion worker using Tesseract/PaddleOCR for Tamil/English scanned PDFs.
- [ ] Step 4.2: Multilingual embedding generation (512-token chunks with 64-token overlap).
- [ ] Step 4.3: Hybrid search API endpoint combining BM25 keyword matching + pgvector cosine similarity.
- [ ] Step 4.4: Citation guardrail enforcing source G.O. URL output.

### Phase 5: Testing, Hardening & GIGW Audit (Weeks 17-20)
- [ ] Step 5.1: Automated accessibility testing with Axe-Core / Playwright for WCAG 2.2 AA.
- [ ] Step 5.2: Lighthouse performance tuning targeting LCP < 2.5s on simulated 3G networks.
- [ ] Step 5.3: Security vulnerability scanning (OWASP Top 10, CERT-In compliance audit).
