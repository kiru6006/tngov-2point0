# Functional Requirements Specification (FRS)

## 1. Module 1: Citizen Service Catalog & Discovery
- **FR-01**: System shall display services categorized into 6 core Life-Events: Identity & Civil Registration, Land & Agriculture, Education & Youth, Social Welfare & Pensions, Revenue & Certificates, Business & MSME.
- **FR-02**: System shall provide full-text search matching English, Tamil Unicode (`\u0B80-\u0BFF`), and transliterated queries.
- **FR-03**: Service Detail view must display statutory SLA in working days, mandatory checklist of required documents, fees, and direct e-Sevai action URL.

## 2. Module 2: P0 Government Contact Directory
- **FR-04**: System shall support 6 navigation tabs: Search Directory, Directory Table, Administrative Hierarchy, District Directory, Leadership Directory, and Contact Verification.
- **FR-05**: System shall enforce entity separation between Position and Person. Transfers update `position_assignments` without altering Position definitions.
- **FR-06**: Directory must filter by Name, Cadre (IAS, IPS, IFS, DRO, State Cadre), Department, District, and Office.
- **FR-07**: Contact cards must provide click-to-call, click-to-email, office address, and transfer G.O. citation link.

## 3. Module 3: Maker-Checker Governance & Workflow
- **FR-08**: Department Nodal Maker shall be able to draft transfer assignments with linked transfer G.O. numbers.
- **FR-09**: System shall automatically detect conflicts (overlapping active assignments on same position or officer).
- **FR-10**: Nodal Approver (Joint Secretary / District DRO) shall review and digitally sign off on assignments before publication to public directory.

## 4. Module 4: Unified Application Status Tracking
- **FR-11**: System shall accept 8–12 alphanumeric application numbers (e.g. `TNREV123456`) and render a 4-stage tracking progress bar:
  1. Application Filed -> 2. Under Field Verification (VAO/RI) -> 3. Officer Review (Tahsildar/DRO) -> 4. Certificate Issued / Dispatched.
- **FR-12**: System shall display statutory SLA target date, current holding office, and last updated timestamp.

## 5. Module 5: Document Intelligence & RAG
- **FR-13**: System shall index Government Orders, Policy Notes, and Notifications by Year, Department, and Document Type.
- **FR-14**: System shall perform hybrid search combining BM25 keyword matching and vector cosine similarity.
- **FR-15**: RAG Assistant shall answer citizen questions strictly grounded in active G.O.s and structured service records, with mandatory citation URLs.
