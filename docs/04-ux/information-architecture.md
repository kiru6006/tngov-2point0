# Information Architecture v1 & Citizen-First Navigation

## 1. Architectural Principles
1. **Life-Event Discovery Over Department Guesswork**: Citizens browse by life situation, not administrative portfolio.
2. **Predictable Navigation Depth**: Maximum 3 clicks from homepage to any statutory service application page.
3. **Bilingual Parity**: Exact hierarchical equivalence in Tamil (`தமிழ்`) and English (`en`).
4. **Context Preservation**: Breadcrumb trails and persistent tracking bars across all sub-levels.

## 2. Master Primary Navigation Structure

### 1. Home (`/`)
- Universal bilingual semantic search bar
- 6 Life-Event service gateways
- 4-stage application tracking component
- State leadership quick-access
- Latest G.O.s and policy notifications banner

### 2. Citizen Services (`/services`)
- Submenus: Certificates, Social Security, Transport & Licences, Utility Payments, Identity Cards.
- Content: Service cards, statutory SLAs, required documents checklist, e-Sevai CTA.
- Personas: Rural citizens, urban professionals, low-literacy users.
- URLs: `/services`, `/services/[id]`

### 3. Schemes and Benefits (`/schemes`)
- Submenus: Kalaignar Magalir Urimai Thittam, Pudhumai Penn, Moovalur Ramamirtham, Chief Minister's Comprehensive Health Insurance (CMCHIS), Farmer Subsidies.
- Content: Verbatim eligibility rules, benefit calculation, application portals.
- URLs: `/schemes`, `/schemes/[id]`

### 4. Government Contact Directory (`/contact-directory`) [P0 Critical]
- Submenus: Search & Table, State Leadership, Administrative Hierarchy, 38 District Administration, Maker-Checker Queue.
- Content: Verified Position cards, official phone, official email, transfer G.O. references.
- URLs: `/contact-directory`, `/contact-directory/leadership`, `/contact-directory/hierarchy`

### 5. Departments and Districts (`/departments`, `/districts`)
- Submenus: 45 Secretariat Departments, 38 District Collectorates.
- Content: Department functions, HoD directory, district collectorate offices, taluk map.
- URLs: `/departments`, `/departments/[id]`, `/districts`, `/districts/[id]`

### 6. Government Orders and Documents (`/documents`)
- Submenus: G.O. Ms., G.O. Rt., Policy Notes, Citizen Charters, Budget Demands, Forms.
- Content: Bilingual OCR-indexed documents, PDF download, issuance date, issuing department.
- URLs: `/documents`, `/documents/[id]`

### 7. Education and Employment (`/education-jobs`)
- Submenus: TNPSC Notifications, TRB, MRB, School Education, Higher Education Scholarships, Employment Exchange (TN Velaivaaippu).
- Content: Job notifications, exam schedules, online registrations.
- URLs: `/education-jobs`

### 8. Land and Property (`/land-property`)
- Submenus: Patta/Chitta Transfer, AnyData Land Records, Encumbrance Certificate (EC), Guideline Values, TNRERA.
- Content: Verification portals, step-by-step transfer guide, survey number lookup.
- URLs: `/land-property`

### 9. Business and Licences (`/business`)
- Submenus: Single Window Portal (TN SWP), MSME Subsidies, Trade Licences, Factories Inspectorate, Pollution Control Board (TNPCB).
- Content: G2B approvals, statutory renewal timelines, incentive schemes.
- URLs: `/business`

### 10. Grievances and Help (`/grievances`)
- Submenus: Mudhalvar Mugavari (CM Helpline 1100), e-Panchayat Grievances, RTI Online, Consumer Forum.
- Content: Grievance submission form, tracking by petition number, appeal hierarchy.
- URLs: `/grievances`

### 11. Government Administration (`/administration`)
- Submenus: Council of Ministers, Secretariat Rules of Business, Public Sector Undertakings (PSUs), Statutory Boards.
- Content: Constitutional profiles, portfolios, administrative hierarchy.
- URLs: `/administration`

### 12. News and Announcements (`/news`)
- Submenus: Press Releases (DIPR), Cabinet Decisions, Tender Notices, Emergency Alerts.
- Content: Media bulletins, tender downloads, public disaster warnings.
- URLs: `/news`

## 3. Mobile Navigation Behavior
- Responsive drawer menu with primary search at top.
- Collapsible multi-tier accordion for submenus.
- Persistent mobile bottom-dock for "Track Status", "Call CM Helpline 1100", and "Language Switch".
