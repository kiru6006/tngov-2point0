# Public vs. Official Workspaces Architecture
**Document Reference: TN-GOV-2.0-MOD-07**

---

### 1. Workspace Partitioning Model
The portal implements role-aware workspace partitioning via `AppShell.tsx`:
1. **Public Citizen Portal** (`workspace="public"`):
   - Designed for citizens, students, farmers, businesses, and expatriates.
   - Core focus: Rapid service application, scheme eligibility, certificate downloads, and tracking existing petitions.
2. **Government Official Workspace** (`workspace="official"`):
   - Designed for Secretariat officers, District Collectors, RDOs, Tahsildars, and departmental nodal officers.
   - Core focus: Operational worklists, pending maker-checker assignment reviews, department SLA compliance alerts, and audit ledgers.

### 2. Feature Comparison Matrix
| Capability | Public Citizen Portal | Government Official Workspace |
|---|---|---|
| **Primary Dashboard** | Search hero, top services, schemes, helplines | Worklist metrics, SLA overdue alerts, pending approvals |
| **Grievance Module** | Public petition status lookup via reference ID | Interactive queue, ATR upload, escalation actions |
| **Performance Module**| High-level department scorecards & disposal rates | Granular sub-division drill-downs, overdue ageing analysis |
| **Contact Directory** | Searchable verified directory with call/email actions| Maker-Checker transfer request workflow & vacancy manager |
| **Documents / G.O.** | Public gazette search and PDF downloads | Pre-publication staging, department circulars, and archive |
