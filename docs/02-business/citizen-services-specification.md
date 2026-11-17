# Citizen Services UX & Functional Specification

## 1. Principles of Service Discovery
- Search by citizen requirement (e.g. "Community Certificate", "Patta Transfer", "Widow Pension") rather than owning department.
- Display verified statutory data: SLAs, required identity credentials, statutory fees, and verified e-Sevai URLs.

## 2. Screen Specifications

### Screen 1: Citizen Service Finder
- **Primary Search Bar**: Predictive auto-suggest supporting Tamil, English, and transliterated queries.
- **Facet Filters**: Citizen Category (Student, Farmer, Property Owner, Senior Citizen), Delivery Mode (Online e-Sevai, In-person, Assisted), Max Processing Days (SLA).

### Screen 2: Service Category Listing
- 6 Life-Event categories displaying active service count and average statutory turnaround time.
- Direct quick-links to top 3 most requested certificates.

### Screen 3: Service Details Deep-View (`/services/[id]`)
- **Header**: Statutory service name in Tamil & English with official Department badge.
- **SLA Badge**: Statutory guarantee (e.g. "15 Working Days").
- **Eligibility Rules**: Verbatim statutory criteria (Zero-generation extract).
- **Mandatory Document Checklist**: Clear checklist with acceptable document formats (PDF, JPG) and max file sizes.
- **Statutory Fee Breakdown**: Government fee, e-Sevai service charge, GST.
- **Responsible Office**: Field office hierarchy (VAO -> Revenue Inspector -> Tahsildar).
- **CTA**: Direct official link to `tnesevai.tn.gov.in` or `eservices.tn.gov.in`.

### Screen 4: Application Guidance & Step-by-Step Walkthrough
- Progressive 3-step guide: 1. Document Preparation -> 2. Online / e-Sevai Submission -> 3. Acknowledgement Receipt.
- Downloadable offline application form for assisted/in-person submissions.

### Screen 5: Official Service Redirect & Consent Interstitial
- Security notice informing citizen they are navigating to the authenticated transactional e-Sevai portal.
- Explicit consent notice conforming to DPDP Act 2023.

### Screen 6: Application Tracking Hub
- Unified tracking input accepting 8–12 alphanumeric application numbers (e.g. `TNREV123456`).
- Visual 4-stage status timeline:
  1. Application Filed & Acknowledged
  2. Field Verification by VAO / Revenue Inspector
  3. Scrutiny by Tahsildar / Approving Authority
  4. Digitally Signed Certificate Issued / Dispatched
- Clear escalation channel if current processing duration exceeds statutory SLA.

### Screen 7: Help & Grievance Redressal Guidance
- Direct integration with Mudhalvar Mugavari (CM Helpline 1100).
- RTI First Appellate Authority contact details for delayed or rejected applications.
