# Canonical Content & Presentation Deduplication
**Document Reference: TN-GOV-2.0-MOD-08**

---

### 1. The Single Source of Truth Principle
To prevent user confusion and maintain compliance with GIGW 3.0, every core functional module has exactly one canonical URL route and presentation pattern:

| Domain | Canonical Route | Deprecated Fragmented Paths | Canonical Presentation |
|---|---|---|---|
| **Citizen Services** | `/services` | `/apply`, `/citizen-services`, `/catalog` | Searchable catalog with 18-attribute detail views |
| **Schemes & Benefits** | `/schemes` | `/benefits`, `/welfare-schemes` | Beneficiary-driven cards with eligibility criteria |
| **Grievance Redressal**| `/grievances` | `/track`, `/cm-cell`, `/complaints` | 8-stage lifecycle timeline with SLA countdown |
| **Contact Directory** | `/contact-directory`| `/directory`, `/officials`, `/whos-who` | 857 verified records with Card/Table/Hierarchy view |
| **Department Performance**| `/performance` | `/kpis`, `/dashboard`, `/analytics` | Synchronized Card and Table view with 6 KPIs |
| **Government Orders** | `/documents` | `/gos`, `/gazettes`, `/orders` | Bilingual searchable document repository |
| **About Tamil Nadu** | `/about` | `/profile`, `/state-info`, `/history` | State symbols, economic profile, public holidays |

### 2. Elimination of Header Mega Menu Duplication
Primary navigation is exclusively handled by the left sidebar. The top header no longer renders redundant drop-down link trees, ensuring cleaner visual focus and faster DOM rendering.
