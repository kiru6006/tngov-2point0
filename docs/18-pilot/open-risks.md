# Open Operational Risks & Residual Vulnerabilities

| Risk Area | Risk Description | Likelihood | Impact | Remediation Plan |
| :--- | :--- | :--- | :--- | :--- |
| **Data Ingestion** | Legacy scanned Tamil PDFs with physical ink smudges may degrade OCR extraction accuracy | MEDIUM | LOW | Human review queue routes low-confidence OCR output for manual correction by nodal staff. |
| **Adversarial Influx** | Coordinated adversarial spam querying AI chat endpoint | LOW | MEDIUM | Edge rate limiting (Cloudflare WAF) and client IP throttling enforced at 100 req/min. |
| **Stale Transfer Records** | Departmental delay in issuing formal G.O. for transfers resulting in temporary lag | MEDIUM | LOW | Nodal officer SLA requires G.O. upload within 24 hours of gazette issuance. |
