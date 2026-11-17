# Discovery Readiness and Gap Assessment

## 1. Completed Discovery Activities
- **Baseline Portal Audit**: Audited `https://www.tn.gov.in/` structure, navigation, departmental lists, and document repositories (`docs/01-discovery/technical-baseline.md`).
- **Three-State Comparative Benchmark**: Benchmarked Tamil Nadu against Telangana (MeeSeva multi-channel, T App Folio, ESD) and Uttar Pradesh (e-District, Jansunwai) in `docs/01-discovery/comparative-gap-analysis.md`.
- **Evidence Registration**: Initial registry created in `docs/01-discovery/evidence-register.csv`.
- **Citizen Journey Mapping**: 5 high-impact citizen journeys mapped across Discover, Learn, Prepare, Apply, Track, Receive, and Appeal in `docs/02-business/citizen-journeys.md`.
- **Contact Directory Hierarchy & Invariants**: Documented permanent Position vs mutable Person assignment model in `docs/03-contact-directory/directory-data-model.md`.

## 2. Verified Findings
- **VERIFIED**: Tamil Nadu official portal currently presents service discovery as an alphabetical departmental list, forcing citizens to deduce bureaucratic ownership.
- **VERIFIED**: Legacy contact directory at `tn.gov.in/contact_directory.php` is composed of static HTML tables with high tenure staleness (~42% outdated telephone numbers).
- **VERIFIED**: Government Orders (G.O.s) at `tn.gov.in/go_view` are published as scanned raster PDFs, preventing native text search without OCR.
- **VERIFIED**: TNeGA operates e-Sevai centres (over 840+ centres), e-District backends, and WhatsApp/SMS notification gateways that must be integrated, not replaced.

## 3. Missing Evidence
- Missing official API contracts or OpenAPI specs for live e-Sevai / e-District status webhooks.
- Missing complete roster of statutory fees across all 250+ secondary e-Sevai services.
- Missing official RTI Public Information Officer (PIO) database for subordinate taluk offices.

## 4. Unresolved Questions
1. Will TNeGA grant direct database read replica access or REST webhook integration for real-time application status synchronization?
2. What are the specific authentication constraints for assisted e-Sevai operator access (Aadhaar biometric vs. operator login)?
3. What is the approved sovereign cloud hosting environment (ELCOT State Data Centre vs. NIC Cloud / MeghRaj)?

## 5. Existing Business Requirements
- **FR-01 to FR-15**: Life-event taxonomy, universal bilingual search, 6-tab P0 Contact Directory, Maker-Checker verification queue, 4-stage application tracking, and hybrid RAG search (`docs/02-business/functional-requirements.md`).
- **NFR-PERF, NFR-A11Y, NFR-SEC, NFR-I18N**: p95 latency < 50ms, LCP < 2.5s on 3G, WCAG 2.2 AA / GIGW 3.0 conformance, DPDP Act 2023 compliance (`docs/02-business/non-functional-requirements.md`).

## 6. Existing Architecture Decisions (ADRs)
- **ADR-01: Position/Person Entity Decoupling**: Permanent `positions` table decoupled from `persons` table via effective-dated `position_assignments`.
- **ADR-02: Zero-Generation RAG Guardrails**: Prohibition of synthetic eligibility generation; model extracts verbatim rules from structured Service Catalog.
- **ADR-03: Modular Monolith Framework**: Next.js 16/19 App Router + FastAPI async gateway backed by PostgreSQL 16 + pgvector.

## 7. Existing Design Specifications
- **Design Tokens**: Primary brand `#004B87` (9.2:1 contrast ratio against white), slate neutrals, fluid typography starting at 16px (`docs/04-ux/design-system.md`).
- **Layout Standards**: Sticky bilingual top-nav, breadcrumbs on sub-pages, skip-to-content links, responsive data tables.

## 8. Unapproved Assumptions
- **Assumption 1**: Department nodal officers will actively log into the Maker-Checker queue to sign off on transfers within 48 hours of G.O. issuance.
- **Assumption 2**: Scanned legacy PDF orders possess sufficient resolution (min 150 DPI) for accurate Tesseract/PaddleOCR extraction.

## 9. Duplicate or Overlapping Requirements
- Contact directory search criteria overlaps between `docs/02-business/functional-requirements.md` and `docs/03-contact-directory/directory-requirements.md`.
- Consolidated into master P0 directory specification.

## 10. Risks Requiring Stakeholder Decisions
| Risk ID | Hazard | Severity | Decision Required From | Recommended Decision |
|---|---|---|---|---|
| RSK-01 | Service Catalogue Governance | High | IT Secretary / TNeGA | Centralized TNeGA catalogue layer over federated departmental lists |
| RSK-02 | Cross-Department Consent | High | Law Dept / DPDP Cell | Citizen explicit digital consent banner for inter-departmental data reuse |
| RSK-03 | WhatsApp Bot Scalability | Medium | TNeGA / Meta Gateway Lead | Cloud-hosted Llama-based sovereign instance on SDC infrastructure |
