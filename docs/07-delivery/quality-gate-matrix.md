# Verification & Quality Gate Matrix (AI-SDLC)

| Gate # | Quality Check Criterion | Target Standard | Verification Method | Status | Sign-off Authority |
|---|---|---|---|---|---|
| QG-01 | Feature Preservation Mapping | 100% legacy capabilities preserved | Audit against legacy sitemap | **PASSED** | Business Analyst Lead |
| QG-02 | P0 Contact Directory Model | Permanent position, mutable assignment | Unit & integration tests | **PASSED** | Domain Architect |
| QG-03 | Transfer & Vacancy Continuity | Historical tenures immutable | Maker-Checker API validation | **PASSED** | Governance Specialist |
| QG-04 | Service Catalogue Metadata | SLA, eligibility rules, document list, fees | CSV/Relational DB verification | **PASSED** | Solutions Architect |
| QG-05 | Document Ingestion & OCR | Machine-readable flag, date, year, dept | Batch OCR worker pipeline test | **PASSED** | AI/ML Architect |
| QG-06 | Bilingual Parity | 100% Tamil/English coverage for core content | `test_gigw_a11y.py` bilingual test | **PASSED** | Localization Specialist |
| QG-07 | Responsive Layout Specs | 360px mobile to 1440px desktop | Mobile viewport testing & Tailwind v4 | **PASSED** | UI/UX Architect |
| QG-08 | Measurable Accessibility | WCAG 2.2 Level AA / GIGW 3.0 | Automated axe-core & contrast audit | **PASSED** | Accessibility Architect |
| QG-09 | API Contracts & Dependencies | Documented OpenAPI endpoints | FastAPI Swagger/Redoc tests | **PASSED** | Backend Lead |
| QG-10 | Security & DPDP Compliance | Zero PII logging, CSP/HSTS headers | OWASP Top 10 security test suite | **PASSED** | Cybersecurity Lead |
| QG-11 | Testable User Stories | MoSCoW priority with acceptance criteria | Backlog audit (`prioritized-mvp-backlog.md`) | **PASSED** | QA Lead |
| QG-12 | Grounded AI / Hallucination Gate | Zero-generation mode, mandatory G.O. URLs | RAG Guardrail test suite (`test_rag.py`) | **PASSED** | AI Ethics Lead |
