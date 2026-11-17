# Requirements Traceability & Coverage Matrix (Prompt 7)

| Req ID | Business Objective | Implemented Feature | Source Files | Test Coverage | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-HOM-01** | Citizen Homepage with bilingual navigation | Hero search, 6 life-event service cards, announcements | `web/src/app/page.tsx` | `test_gigw_a11y.py` | Implemented and tested |
| **REQ-DIR-01** | Contact Directory master data with maker-checker | 17-table schema, transfer engine, quality scanner | `api/directory/router.py` | `test_directory.py`, `test_e2e_citizen_journeys.py` | Implemented and tested |
| **REQ-DIR-02** | Zero vector hallucination for current officials | Deterministic SQL query on active assignments | `api/ai/service.py` | `test_ai_citizen_assistant.py` | Implemented and tested |
| **REQ-SRV-01** | Citizen Services catalog with SLA and e-Sevai links | Service list, category filtering, detail view | `web/src/app/services/` | `test_api.py`, `test_portal_discovery.py` | Implemented and tested |
| **REQ-SCH-01** | Flagship Schemes discovery with eligibility metadata | 8 welfare schemes with statutory benefit rules | `web/src/app/schemes/` | `test_portal_discovery.py` | Implemented and tested |
| **REQ-DOC-01** | Government Orders (G.O.) search and machine-readable view | PDF document registry, category and year filter | `web/src/app/documents/` | `test_portal_discovery.py` | Implemented and tested |
| **REQ-SRC-01** | Unified federated search with dynamic facets | Search over services, schemes, docs, and contacts | `web/src/app/search/` | `test_portal_discovery.py` | Implemented and tested |
| **REQ-KSK-01** | Assisted Access Mode for e-Sevai kiosk operators | Operator checklist, simplified UI, printable receipt | `web/src/app/assisted/` | `test_gigw_a11y.py` | Implemented and tested |
| **REQ-AI-01** | Grounded Citizen Assistant with citation enforcement | Bilingual RAG + deterministic router | `api/ai/` | `test_ai_citizen_assistant.py` | Implemented and tested |
| **REQ-SEC-01** | OWASP and DPDP data minimization compliance | Security headers middleware, PII stripping | `api/main.py` | `test_security_audit.py` | Implemented and tested |
