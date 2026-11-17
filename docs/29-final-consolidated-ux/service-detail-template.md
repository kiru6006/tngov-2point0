# Standard 18-Attribute Service Detail Specification Template

Every canonical citizen service rendered under `/services/[id]` must strictly display the following 18 verified attributes:

| # | Attribute Name | Description & Requirement | Example Value |
| :---: | :--- | :--- | :--- |
| **1** | Service Name | Full statutory English service title | Community Certificate |
| **2** | Tamil Service Name | Full statutory Tamil service title | சாதிச் சான்றிதழ் |
| **3** | Short Description | Clear, citizen-friendly scope definition | Statutory caste/community certificate for SC/ST/OBC/BC status proof. |
| **4** | Responsible Department | Issuing Secretariat and Directorate | Revenue and Disaster Management Department |
| **5** | Who Can Apply | Eligible applicant categories | Permanent residents of Tamil Nadu belonging to notified communities. |
| **6** | Eligibility | Statutory eligibility conditions | Domiciled in Tamil Nadu; parental community proof or school records. |
| **7** | Required Documents | Mandatory checklist of proofs | 1. Aadhaar Card, 2. Smart Ration Card, 3. Parent/Self prior certificate. |
| **8** | Application Procedure | Step-by-step citizen instructions | Apply via e-Sevai Kiosk or online portal with e-KYC and pay fee. |
| **9** | Fees (Verified) | Exact statutory or kiosk fee | ₹60 (TNeGA e-Sevai standard fee) |
| **10** | Processing Time (SLA)| Statutory charter delivery time | 15 Working Days |
| **11** | Application Mode | Delivery channel availability | Online (e-Sevai Portal) & Assisted (e-Sevai Centers) |
| **12** | Official Application Link | Verified government transaction URL | `https://www.tnesevai.tn.gov.in/` |
| **13** | Application Tracking Link| Verified application tracking URL | `https://edistricts.tn.gov.in:8443/certificates/` |
| **14** | Related Government Orders| Statutory G.O. citations | G.O. Ms. No. 14, Revenue & Disaster Management Dept |
| **15** | Related Government Office| Competent issuing authority | Taluk Office / Zonal Deputy Tahsildar |
| **16** | Grievance Channel | Citizen escalation mechanism | CM Helpline 1100 / Special Cell Portal |
| **17** | Last Verified Date | Audit verification timestamp | 2026-02-15 |
| **18** | Official Source | Official legal source | Tamil Nadu Citizen Charter & Revenue Administration |

### Standard Interactive Actions
- **Primary Action Button**: `APPLY / OPEN OFFICIAL SERVICE` (Leads directly to official verified application portal)
- **Secondary Action Buttons**:
  - `Check Application Status` (Opens official tracking portal)
  - `View Required Documents` (Scrolls to mandatory checklist)
  - `Find Nearest Office / e-Sevai Center` (Opens `/assisted` locator)
  - `Get Help / Grievance (1100)` (Dials `tel:1100`)
