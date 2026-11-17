# Government Contact Directory UX & UI Specification (P0 Critical)

## 1. Overview & Purpose
The Government Contact Directory provides an authenticated, verified single source of truth for all public administrative contacts in the Government of Tamil Nadu. It completely decouples permanent positions from transitory personnel.

## 2. Screen Specifications

### Screen 1: Contact Directory Overview
- **Header**: Bilingual portal title with quick search input and export button.
- **Category Tiles**:
  1. Constitutional Leadership (Governor, Chief Minister)
  2. Council of Ministers (Cabinet Portfolios)
  3. Legislative Assembly (MLAs, MPs)
  4. Apex Secretariat (Chief Secretary, Additional Chief Secretaries, Principal Secretaries)
  5. Executive Heads of Departments (HoDs, Commissioners, Directors)
  6. District Administration (38 District Collectors & Magistracies)
  7. Field Revenue Administration (DROs, RDOs, Tahsildars)
  8. Autonomous Undertakings (ELCOT, TNeGA, SIPCOT, TIDCO)
  9. RTI Authorities (PIOs, First Appellate Authorities)
  10. Emergency & Grievance Helplines (1100, 108, 100, 1098, 181)

### Screen 2: Advanced Contact Search
- **Filter Controls**:
  - Keyword (matches Tamil & English name, title, department)
  - Cadre dropdown (State Leadership, IAS, IPS, IFS, State Revenue, All)
  - Department multi-select (45 Secretariat Departments)
  - District selector (38 Revenue Districts)
  - Administrative Level (State, Regional, District, Taluk)
- **Live Match Count**: Instantaneous updates via debounced API query.

### Screen 3: Contact Directory Table
- **Columns**: Official Name, Designation, Department, Office, District, Phone (click-to-call), Email (click-to-email), Last Verified, Status (Active/Vacant), Actions (View Details).
- **Accessibility**: Column headers associated with `th scope="col"`, keyboard sorting, screen-reader status announcements.

### Screen 4: Administrative Hierarchy View
- **Visualization**: Interactive tree view displaying statutory reporting lines:
  `Tamil Nadu Apex Secretariat -> Chief Secretary -> Principal Secretary -> Commissioner -> District Collector -> Tahsildar`.
- **Integrity Guarantee**: Hierarchy is department-specific, grounded in statutory Rules of Executive Business.

### Screen 5: Official Profile Deep-View
- Comprehensive details of the active position assignment:
  - Official name, photograph placeholder, verified badge.
  - Statutory designation and cadre seniority.
  - Office address with geolocation mapping.
  - Subordinate offices and reporting officer.
  - Authoritative source reference: Government Order (G.O.) number and date.
  - Historical tenure timeline showing previous position holders.

### Screen 6: Nodal Contact Management & Maker-Checker Queue
- **Restricted Access**: Role-Based Access Control (RBAC) restricted to verified Department Nodal Officers.
- **Workflow Actions**:
  - Propose transfer / new assignment.
  - Run automated conflict detection (checks active tenures across departments).
  - Approver digital signature sign-off.
  - Flag dispute or tenure anomaly.
  - Immutable audit trail.
