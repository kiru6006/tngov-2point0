# Official Source Registry Specification

## 1. Grounded Official Sources
The directory ingests data strictly from official, authoritative government sources:

| Source ID | Organization | URL | Type | Category | Responsible Owner |
|---|---|---|---|---|---|
| `SRC-GAZETTE-2026` | Public (Special.A) Dept | `https://www.tn.gov.in/stationery_printing/gazette` | GAZETTE_GO | IAS Transfers & Postings | Chief Secretary Secretariat |
| `SRC-PORTAL-DIR` | TNeGA | `https://www.tn.gov.in/contact_directory.php` | GOVERNMENT_WEBPAGE | Secretariat Contacts | State Nodal Directory Officer |
| `SRC-REV-DIR` | Revenue & Disaster Management | `https://revenue.tn.gov.in/officers` | DEPARTMENT_PORTAL | Collectorates & Tahsildars | Additional Chief Secretary |
| `SRC-LEG-DIR` | Tamil Nadu Legislative Assembly | `https://assembly.tn.gov.in/` | OFFICIAL_PORTAL | MLAs & Ministers | Legislative Secretary |

## 2. Ingestion Rules
- Zero synthetic data published as genuine appointments.
- OCR confidence score must exceed 0.85 for PDF extracts.
- SHA-256 content hashes computed upon retrieval to detect updates or regressions.
- If upstream site is unreachable or rate-limited, failure reasons are catalogued under `SourceDocument.failure_reason`.
