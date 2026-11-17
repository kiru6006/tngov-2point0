# Government Portal Threat Model & STRIDE Analysis

| STRIDE Category | Threat Scenario | Portal Attack Surface | Mitigation Control |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Impersonation of department nodal officer to modify official directories | Directory Change Request / Admin Auth | Multi-Factor Authentication, Role-based tokens, Maker-checker verification. |
| **Tampering** | Modifying welfare eligibility rules in database or in-flight responses | SQL / API payloads / Database migrations | Parameterized queries, ORM integrity constraints, checksum verification on G.O. documents. |
| **Repudiation** | An officer denying having approved an officer transfer or contact change | Audit log entries | Immutable `audit_events` ledger recording actor ID, IP address, timestamp, and change diffs. |
| **Information Disclosure** | Scraping unlisted private mobile numbers of IAS/IPS officers | Public Contact APIs | Data minimization filter stripping non-public contact channels from citizen endpoints. |
| **Denial of Service** | Volumetric flooding on AI Assistant or semantic search endpoints | `/api/v1/ai/chat`, `/api/v1/search` | Rate-limiting (100 req/min per IP), response payload budgets, in-memory caching. |
| **Elevation of Privilege** | Citizen or kiosk operator accessing nodal admin workflows | `/api/v1/admin/*` routes | Strict RBAC middleware (`role = 'nodal_officer' | 'superadmin'`), separate admin ingress. |
