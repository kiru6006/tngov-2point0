# MASTER ANTIGRAVITY PROMPT
## Tamil Nadu Government Digital Portal 2.0
### Government Website Modernization | Citizen Services | Contact Directory | AI-SDLC

## 1. ROLE AND OBJECTIVE

Act as a multidisciplinary team of senior experts:

1. Principal Government Digital Transformation Consultant with 30+ years of experience.
2. Senior Business Analyst specializing in Indian government services.
3. Government Administrative Structure and Public Governance Specialist.
4. Senior Citizen Experience and UI/UX Architect.
5. Principal React and TypeScript Architect.
6. Principal Python and FastAPI Architect.
7. Enterprise Solution and Integration Architect.
8. Government Data and Master Data Management Architect.
9. AI/ML and RAG Architect.
10. Cybersecurity, Privacy and Accessibility Architect.
11. AI-SDLC, QA and DevSecOps Lead.
12. Government Content Governance and Tamil Localization Specialist.

### Mission

Modernize the Tamil Nadu Government website into a citizen-first, mobile-first, bilingual, accessible, AI-enabled government digital portal.

**Primary website:**
https://www.tn.gov.in/index.php

**Benchmark websites:**
- Telangana: https://www.telangana.gov.in/
- Uttar Pradesh: https://up.gov.in/en

Study the existing Tamil Nadu portal and benchmark the other two states to identify better approaches to government information, citizen services, contact directories, service navigation, accessibility and digital governance.

Do not simply copy their UI. Identify what works, what does not, and what Tamil Nadu should improve.

**Important: Start with discovery and requirements engineering. Do not immediately write application code.**

---

# 2. NON-NEGOTIABLE ENGINEERING RULES

1. Do not remove or replace any existing feature without documenting it.
2. Preserve all legitimate government services, documents, directories and information.
3. Identify duplicate functionality before recommending consolidation.
4. Do not invent government officials, contact numbers, designations, departments, fees or services.
5. Use verified official sources for government information.
6. Maintain evidence URLs and verification dates.
7. Clearly separate VERIFIED, OBSERVED, INFERRED, PROPOSED and UNKNOWN findings.
8. Do not access protected systems or bypass authentication.
9. Do not perform intrusive security testing.
10. Keep Tamil and English as first-class languages.
11. Design for mobile, tablet and desktop.
12. Follow applicable Indian government website, accessibility, cybersecurity and privacy requirements.
13. Maintain compatibility with existing government systems.
14. Do not modify any live government website.
15. Use clearly labelled mock data for demonstrations.
16. Obtain human approval before implementing high-impact changes.

---

# 3. PHASE 1: THREE-STATE WEBSITE DISCOVERY

Perform structured discovery of all three government portals.

## 3.1 Tamil Nadu Website

Inspect:

- Homepage and navigation
- Departments
- Districts
- Government Orders
- Policy Notes
- Acts and Rules
- Circulars and Notifications
- Announcements
- Online Services
- Schemes
- Forms
- Job Opportunities
- Contact Directory
- Heads of Departments
- Council of Ministers
- MLAs and MPs
- District Collectors
- Boards and Undertakings
- RTI Contacts
- Grievances
- Helplines
- Mobile Application Directory
- Press Releases
- Important Websites
- Sitemap
- Tamil and English interfaces

## 3.2 Telangana Website

Study:

- Citizen service organization
- MeeSeva service discovery
- Department directory
- Government contact directory
- Application tracking
- Certificate verification
- District services
- Public utility services
- Service centres
- Government documents
- Accessibility
- Mobile experience
- Navigation hierarchy

## 3.3 Uttar Pradesh Website

Study:

- Citizen-category navigation
- e-District services
- Jansunwai grievance platform
- Department directory
- District administration
- Government contacts
- Government Orders
- e-Governance project directory
- Employment services
- Business and investment services
- Land records
- Citizen assistance
- Accessibility
- Mobile experience

## 3.4 Comparative Benchmark Matrix

Create a detailed comparison with these columns:

| Field | Description |
|---|---|
| Feature ID | Unique identifier |
| Feature Category | Services, Directory, Documents, etc. |
| Tamil Nadu | Existing capability |
| Telangana | Benchmark capability |
| Uttar Pradesh | Benchmark capability |
| Citizen Value | Why it matters |
| Existing Gap | Verified or proposed gap |
| Recommendation | Preserve, Improve, Integrate, Introduce |
| Priority | P0/P1/P2 |
| Evidence | Official source URL |
| Verification | Verified/Observed/Unknown |

Do not mark a capability as absent until the relevant pages have been inspected.

---

# 4. PHASE 2: GOVERNMENT CONTACT DIRECTORY (P0 CRITICAL)

**This is one of the most important modules in the entire modernization project.**

Do not treat Contact Directory as a simple static page or footer link.

Design it as a comprehensive, searchable, verified Government Contact and Administrative Directory.

## 4.1 Contact Categories

Include:

### A. State Leadership
- Governor
- Chief Minister
- Deputy Chief Minister, where applicable
- Council of Ministers
- Ministerial portfolios
- Chief Secretary
- Additional Chief Secretaries
- Principal Secretaries
- Secretaries

### B. Legislative Representatives
- Lok Sabha MPs
- Rajya Sabha MPs
- MLAs
- Constituency information
- Official legislative contact details where published

### C. Department Administration
- Department Secretaries
- Heads of Departments
- Directors
- Commissioners
- Additional Directors
- Joint Directors
- Deputy Directors
- Regional Officers
- District Officers
- Subordinate Offices

### D. District Administration
- District Collectors
- District Revenue Officers
- Revenue Divisional Officers
- Tahsildars
- District-level departmental officers
- Municipal Commissioners
- Local body officials

### E. Boards and Undertakings
- Government Boards
- Corporations
- Public Sector Undertakings
- Authorities
- Statutory Bodies
- Government Agencies

### F. Citizen Support
- Public Grievance Officers
- RTI Public Information Officers
- Appellate Authorities
- Department Helplines
- Emergency Helplines
- Citizen Service Centres
- Public Assistance Offices

All categories must be validated against actual Tamil Nadu government structures.

## 4.2 Official Sources

Start with:

https://www.tn.gov.in/contact_directory.php

https://www.tn.gov.in/minister_list.php

https://www.tn.gov.in/cont_dir_department_list.php

https://www.tn.gov.in/cont_dir_All_hod_list.php

https://www.tn.gov.in/district_collector.php

https://www.tn.gov.in/cont_dir_All_und_tak.php

https://www.tn.gov.in/district_list.php

https://assembly.tn.gov.in/

Also identify official department-specific contact directories.

Do not assume every source is current. Cross-check where possible.

## 4.3 Directory Data Model

Maintain separate entities for:

1. Person
2. Government Position
3. Department
4. Office
5. Administrative Unit
6. Jurisdiction
7. Official Contact Channel
8. Position Assignment
9. Reporting Relationship
10. Verification Evidence

Required fields:

- Contact ID
- Official name
- Designation
- Department
- Wing
- Office
- District
- Constituency, where applicable
- Administrative level
- Official telephone
- Official email
- Office address
- Reporting position
- Responsibilities
- Source URL
- Last verified date
- Effective date
- Assignment status
- Data owner
- Approval status

Do not use private mobile numbers or personal email addresses unless explicitly authorized for official publication.

## 4.4 Directory UI

Create a dedicated top-level navigation item:

**Contact Directory**

Design the following tabs:

### Tab 1: Search Directory

Provide a powerful search interface.

Search by:

- Official name
- Designation
- Department
- District
- Constituency
- Office
- Wing
- Administrative level
- Responsibilities

Support Tamil and English search.

### Tab 2: Directory Table

Show a structured table containing:

- Official
- Designation
- Department
- District
- Office
- Official Phone
- Official Email
- Last Verified
- View Details

Support sorting, filtering, pagination and accessible export where permitted.

### Tab 3: Administrative Hierarchy

Provide an organization-tree view:

State Government
  → Department
    → Secretary
      → Head of Department
        → Regional Office
          → District Office
            → Subordinate Office

The hierarchy must be department-specific and based on verified reporting relationships.

Do not impose a fictional universal reporting hierarchy.

### Tab 4: District Directory

Select a district to display:

- Collectorate
- Revenue Offices
- Municipal Administration
- Police and Emergency Contacts
- Departmental District Offices
- Citizen Service Centres
- Public Grievance Contacts

### Tab 5: Leadership Directory

Provide dedicated views for:

- Council of Ministers
- Secretaries
- Heads of Departments
- District Collectors
- Legislators

### Tab 6: Contact Verification

Restricted to authorized officials.

Show:

- Pending verification
- Recently changed assignments
- Vacant positions
- Conflicting contact details
- Outdated information
- Missing official contacts
- Approval queue

## 4.5 Advanced Directory Features

Implement the following as approved capabilities:

1. Unified search.
2. Synchronized filters across table and hierarchy views.
3. Official contact cards.
4. Click-to-call.
5. Click-to-email.
6. Office location and directions.
7. Department hierarchy navigation.
8. Position transfer history.
9. Effective-dated assignments.
10. Duplicate detection.
11. Verification reminders.
12. Department ownership.
13. Role-based editing.
14. Approval workflows.
15. Audit logging.
16. Contact freshness indicators.
17. Citizen service-to-office mapping.
18. Accessible mobile directory.
19. Tamil and English contact search.
20. Public versus restricted data separation.

## 4.6 Critical Architectural Rule

Do not store a person and their designation as a single permanent record.

A government position can remain active while the assigned official changes.

Maintain:

- Position master
- Person master
- Assignment history
- Department master
- Jurisdiction master
- Official contact channels

When an official is transferred, update the assignment rather than deleting the position.

## 4.7 Directory Acceptance Criteria

- Users can find an official by name, designation, department or district.
- Search and filters work consistently.
- Table and hierarchy views use the same verified dataset.
- Contact details have authoritative source references.
- Vacant positions do not display previous officials as current.
- Transfers preserve assignment history.
- Authorized officers can review and approve updates.
- Mobile and tablet interfaces remain usable.
- Tamil and English search are supported.
- No unverified contact information is presented as confirmed.

---

# 5. PHASE 3: CITIZEN-FIRST INFORMATION ARCHITECTURE

Propose the following main navigation:

1. Home
2. Citizen Services
3. Schemes and Benefits
4. Certificates and Documents
5. Land and Property
6. Education and Employment
7. Business and Licences
8. Departments and Districts
9. Government Orders and Publications
10. Contact Directory
11. Grievances and Help
12. Government and Administration
13. News and Announcements

Validate the final menu structure using user research and navigation testing.

Citizens should not need to know which government department owns a service before finding it.

---

# 6. PHASE 4: UI/UX DESIGN

Design a modern government website that is:

- Professional
- Clean
- Accessible
- Bilingual
- Mobile-first
- Fast
- Easy to navigate
- Suitable for low-bandwidth networks

Use a light theme with strong contrast, clear typography and consistent spacing.

Avoid unnecessary animations, crowded carousels, oversized banners and excessive visual decoration.

## Required Screens

### Citizen Portal

1. Homepage
2. Universal Search
3. Citizen Services
4. Service Details
5. Schemes
6. Scheme Details
7. Certificates
8. Land and Property
9. Education and Employment
10. Business Services
11. Departments
12. Department Details
13. Districts
14. District Details
15. Government Orders
16. Government Documents
17. Contact Directory
18. Contact Details
19. Administrative Hierarchy
20. Grievances
21. Helplines
22. Jobs
23. News and Announcements
24. Accessibility and Help

### Government Workspace

25. Content Dashboard
26. Contact Management
27. Contact Verification
28. Department Content Management
29. Document Publishing
30. Approval Workflow
31. Audit History
32. Content Quality Dashboard

### Leadership and Administration

33. Government Portal Overview
34. Content Freshness Dashboard
35. Department Performance
36. Service Discovery Analytics
37. Contact Directory Quality
38. Integration Health

For each screen provide:

- Purpose
- Target users
- Page layout
- Components
- Data fields
- Filters
- User interactions
- Mobile layout
- Tablet layout
- Desktop layout
- Empty states
- Error states
- Accessibility
- API requirements
- Acceptance criteria

Produce wireframes before writing frontend components.

---

# 7. PHASE 5: TECHNICAL ARCHITECTURE

## Frontend

Preferred stack:

- React
- TypeScript
- Vite or Next.js based on SEO and rendering needs
- TanStack Query
- Accessible component library
- Design tokens
- Internationalization
- Responsive layouts
- Automated accessibility testing

## Backend

Preferred stack:

- Python
- FastAPI
- Pydantic
- PostgreSQL
- Search engine selected after evaluation
- Redis only where justified
- Background workers for approved synchronization
- OpenAPI contracts

## Core Modules

1. Citizen Portal
2. Service Catalogue
3. Government Contact Directory
4. Department Registry
5. District Registry
6. Document Registry
7. Search and Discovery
8. Content Management
9. Translation Workflow
10. External Government Integrations
11. Citizen Assistance
12. Administrative Analytics
13. Audit and Compliance
14. AI Assistance

Prefer a modular monolith initially unless deployment scale or departmental ownership requires separate services.

## Government Integration Strategy

Classify every external system as:

- Official external link
- Approved API integration
- Federated identity integration
- Application status integration
- Transaction integration
- Manual content synchronization

Never claim that a service is integrated when it is only externally linked.

---

# 8. PHASE 6: RESPONSIBLE AI CAPABILITIES

Evaluate the following AI use cases.

## Citizen AI Assistant

Allow citizens to ask:

- How do I obtain an income certificate?
- Who is the District Collector?
- Which department handles land acquisition?
- Where can I download a Government Order?
- How can I contact the relevant government office?
- What documents are required for a service?

Use verified government sources and provide citations.

## AI Contact Directory Assistant

Example:

"Who is responsible for highways in Dharmapuri district?"

The assistant should:

1. Understand the requested department and district.
2. Search the verified directory.
3. Identify the relevant office and designation.
4. Return the current verified officeholder only if available.
5. Provide official contact information.
6. Show the source and verification date.
7. Avoid guessing when data is missing.

## AI Content Governance

Identify:

- Duplicate contacts
- Potentially outdated records
- Missing phone numbers
- Broken links
- Conflicting assignments
- Missing Tamil translations
- Unverified department information

AI may recommend corrections but must not automatically publish official information.

---

# 9. PHASE 7: AI-SDLC EXECUTION

Use specialized agents:

1. Discovery Agent
2. Benchmark Analysis Agent
3. Business Analyst Agent
4. Government Directory Agent
5. UX Research Agent
6. Architecture Agent
7. Frontend Agent
8. Backend Agent
9. Data Quality Agent
10. Security Agent
11. QA Agent
12. Documentation Agent

Every agent must produce reviewable outputs.

Require human approval at:

- Discovery completion
- BRD approval
- Directory data-model approval
- UX approval
- Architecture approval
- Integration authorization
- Prototype acceptance
- Production release

Use GitHub issues, pull requests, automated tests and architecture decision records.

---

# 10. REQUIRED DOCUMENTATION

Create:

docs/
  00-executive/
    vision.md
    modernization-strategy.md
    business-case.md

  01-discovery/
    tamil-nadu-inventory.md
    telangana-benchmark.md
    uttar-pradesh-benchmark.md
    comparative-gap-analysis.md
    evidence-register.csv

  02-business/
    business-requirements.md
    functional-requirements.md
    non-functional-requirements.md
    citizen-personas.md
    citizen-journeys.md
    stakeholder-questions.md

  03-contact-directory/
    directory-requirements.md
    directory-data-model.md
    administrative-hierarchy.md
    official-source-register.md
    contact-verification-workflow.md
    transfer-management.md
    directory-ux-specification.md

  04-ux/
    information-architecture.md
    sitemap.md
    wireframes.md
    design-system.md
    accessibility.md

  05-architecture/
    solution-architecture.md
    frontend-architecture.md
    backend-architecture.md
    integration-architecture.md
    security-architecture.md

  06-ai/
    ai-opportunities.md
    rag-design.md
    ai-risk-register.md
    evaluation-plan.md

  07-delivery/
    roadmap.md
    backlog.md
    acceptance-criteria.md
    test-strategy.md
    requirements-traceability.md

---

# 11. IMPLEMENTATION ROADMAP

## Phase 0: Discovery

Audit Tamil Nadu, Telangana and Uttar Pradesh.

Deliver:
- Existing website inventory
- Three-state comparison
- Government contact source inventory
- Business gap analysis

## Phase 1: Business Requirements

Prepare:
- BRD
- Citizen personas
- User journeys
- Functional and non-functional requirements
- Contact directory requirements

## Phase 2: UX and Architecture

Prepare:
- Homepage wireframe
- Contact Directory wireframe
- Service Finder wireframe
- Government Documents wireframe
- Content Management wireframe
- Technical architecture
- Data model

## Phase 3: Public Portal MVP

Implement after approval:

- Citizen Homepage
- Government Contact Directory
- Service Finder
- Departments and Districts
- Government Documents
- Bilingual Navigation
- Universal Search

## Phase 4: Government Content Workspace

Implement:

- Contact verification
- Department content management
- Approval workflow
- Audit logs
- Translation management

## Phase 5: Integrations and AI

Implement only authorized integrations and approved AI capabilities.

## Phase 6: Pilot and Rollout

Perform:

- Functional testing
- Accessibility testing
- Mobile and tablet testing
- Security review
- Performance testing
- Citizen usability testing
- Data reconciliation
- Controlled rollout

---

# 12. SUCCESS METRICS

Measure:

### Citizen Experience
- Service discovery success
- Time to find services
- Mobile usability
- Tamil search quality
- Accessibility task completion

### Contact Directory
- Verified contact coverage
- Missing contact percentage
- Duplicate records
- Outdated assignment percentage
- Average verification turnaround
- Contact search success rate
- Department ownership completeness

### Content Governance
- Publishing turnaround
- Broken links
- Outdated documents
- Approval backlog
- Translation completeness

### Technical
- Core Web Vitals
- Availability
- Error rates
- API latency
- Security findings

Define numerical targets only after collecting baseline measurements.

---

# 13. FIRST EXECUTION INSTRUCTION

**START WITH PHASE 0 ONLY.**

Perform these steps sequentially:

1. Inspect the Tamil Nadu Government homepage and sitemap.
2. Inventory existing navigation, pages and features.
3. Inspect the Telangana Government portal.
4. Inspect the Uttar Pradesh Government portal.
5. Produce a three-state feature comparison.
6. Deeply inspect the Tamil Nadu Government Contact Directory and its linked sources.
7. Build a preliminary administrative hierarchy and directory data model.
8. Identify verified gaps and proposed improvements.
9. Prepare the initial BRD and requirements traceability matrix.
10. Produce high-level wireframe specifications for the homepage, Contact Directory, Service Finder and Government Document Search.
11. Present findings, unknowns, risks and decisions requiring approval.

If website access fails, record the limitation and continue with verified evidence. Do not invent findings.

**Do not start React or Python implementation yet.**

At the end, provide:

- Executive Summary
- Website Discovery Report
- Three-State Benchmark Report
- Contact Directory Assessment
- Business Requirements v1
- Proposed Information Architecture
- Initial UX Wireframes
- Solution Architecture Proposal
- Risk Register
- Prioritized Backlog
- Recommended Next Execution Prompt

## FINAL OBJECTIVE

Deliver a defensible, evidence-based modernization blueprint for the Tamil Nadu Government Digital Portal 2.0.

The platform must make government services and official information easier for citizens to access while improving government content accuracy, administrative accountability and operational efficiency.

**The Government Contact Directory is a mandatory P0 capability and must be included in the first approved MVP.**