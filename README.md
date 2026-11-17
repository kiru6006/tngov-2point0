# Tamil Nadu Government Digital Portal 2.0 (tngov-2point0)

Modern, citizen-first, bilingual (Tamil/English), GIGW 3.0 / WCAG 2.2 AA compliant digital portal architecture for Tamil Nadu Government (tn.gov.in).

## 1. Project Overview
Modernization addressing core technical debt:
- Direct handoff between informational portal and transactional services (tnesevai.tn.gov.in).
- Batch OCR pipeline for scanned PDF repositories (G.O.s, Policy Notes).
- P0 verified Government Contact Directory with decoupled Person and Position entities.
- Low-bandwidth, mobile-first responsive architecture.

## 2. Target Architecture
- Frontend: Next.js 19 (App Router, Tailwind CSS, Edge CDN, Bilingual Tamil/English).
- API Gateway: Python FastAPI (Async proxies to TNeGA e-Sevai status endpoints).
- CMS & DB: Strapi/Directus Headless CMS on PostgreSQL 16.
- Search & RAG: Milvus/pgvector + Multilingual E5 embeddings + Tesseract OCR.

## 3. Repository Layout
- README.md: Project root documentation
- PRD.md: Master Antigravity prompt & non-negotiable rules
- PRD1.md: Discovery baseline audit & crawl simulation reports
- docs/00-executive/: Strategy, vision, business case
- docs/01-discovery/: Technical baseline, comparative gap analysis
- docs/02-business/: Citizen personas, journeys, AS-IS process flows
- docs/03-contact-directory/: P0 Contact Directory data model & hierarchy
- docs/04-ux/: Design system, IA, wireframe specifications
- docs/05-architecture/: Next.js, FastAPI, PostgreSQL, security specs
- docs/06-ai/: RAG pipeline, risk register, OCR ingestion
- docs/07-delivery/: 20-week roadmap, AI-SDLC model, success metrics
- data/: Master service and document catalog schemas

## 4. Documentation Index
| Module | File | Purpose |
|---|---|---|
| Discovery | docs/01-discovery/technical-baseline.md | Core Web Vitals, GIGW & mobile audit |
| Business | docs/02-business/citizen-journeys.md | E-Sevai & certificate friction maps |
| Contact Dir | docs/03-contact-directory/directory-data-model.md | P0 Position vs Person DB schema |
| UX/UI | docs/04-ux/design-system.md | WCAG 2.2 AA, Noto Sans Tamil, brand tokens |
| Tech Stack | docs/05-architecture/solution-architecture.md | Next.js + FastAPI decoupled stack |
| AI / RAG | docs/06-ai/rag-design.md | Bilingual RAG retrieval & zero-hallucination rules |
| Delivery | docs/07-delivery/roadmap.md | 20-week phased implementation plan |
