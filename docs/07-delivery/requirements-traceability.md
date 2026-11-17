# Requirements Traceability Matrix

| Req ID | Category | Business Problem | Architecture Component | Target Document / Schema | Verification Gate |
|---|---|---|---|---|---|
| REQ-01 | UX / Navigation | Citizen forced to guess department owner | Life-Event grouping taxonomy | docs/04-ux/sitemap.md | Usability test |
| REQ-02 | Search / AI | Trapped scanned PDF content | OCR pipeline + pgvector | docs/06-ai/rag-design.md | Search benchmark |
| REQ-03 | Directory | Outdated official contacts after transfers | Position/Person split DB | docs/03-contact-directory/directory-data-model.md | Unit & API tests |
| REQ-04 | Governance | Stale phone numbers & missing offices | Maker-Checker workflow | docs/03-contact-directory/contact-verification-workflow.md | RBAC test |
| REQ-05 | Integration | Disconnected e-Sevai status tracking | FastAPI proxy gateway | docs/05-architecture/solution-architecture.md | Contract testing |
