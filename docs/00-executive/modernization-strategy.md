# Tamil Nadu Government Digital Portal 2.0: Modernization Strategy

## 1. Strategic Context & Mandate
The Tamil Nadu State Government website (`tn.gov.in`) serves over 76 million citizens as the statutory digital gateway to state governance, policy notifications, administrative contacts, and public services. The modernization strategy shifts the paradigm from an administrative departmental brochure to an integrated, citizen-first, mobile-accessible, and AI-assisted public digital infrastructure.

## 2. Core Pillars of Transformation

### 2.1 Citizen-Centric Information Architecture
- Elimination of siloed departmental boundaries. Citizens navigate through **Life-Events** (Birth, Education, Agriculture, Business, Social Welfare, Land & Property).
- Consolidated Service Finder mapping all 250+ e-Sevai and departmental services to statutory SLAs, required identity credentials, and fees.

### 2.2 P0 Verified Government Contact Directory
- Decoupling of **Positions** from **Persons**. Positions remain permanent statutory entities; transfers update historical assignments without breaking directories.
- Human-in-the-Loop Maker-Checker verification pipeline preventing stale phone numbers, expired tenures, and unverified contacts.
- Comprehensive coverage spanning State Leadership (Ministers), Secretariat Secretaries, Heads of Departments (HoDs), District Collectors, and Field Tahsildars.

### 2.3 Responsible AI & Document Intelligence
- Batch OCR digitizing scanned legacy Government Orders (G.O.s) and Policy Notes.
- Multilingual Retrieval-Augmented Generation (RAG) bridging bureaucratic nomenclature with colloquial Tamil and English queries.
- Zero-generation guardrails enforcing verbatim statutory eligibility extraction and mandatory source G.O. hyperlinked citations.

### 2.4 Inclusive Accessibility & GIGW 3.0 Compliance
- Strict WCAG 2.2 Level AA conformance across desktop, tablet, and mobile browsers.
- Native high-contrast color scheme (`#004B87` primary brand exceeding 4.5:1 ratio).
- First-class bilingual parity between Tamil (`தமிழ்`) and English.

## 3. Technology Stack Standardization
- **Frontend**: Next.js 16/19 App Router, React 19, Tailwind CSS v4, Lucide Icons.
- **Backend API Gateway**: Python 3.12+ FastAPI with Pydantic validation, structured OpenAPI contracts, and asynchronous database adapters.
- **Data Stores**: PostgreSQL 16 relational database with pgvector extension for high-performance semantic search.
- **Hosting & Security**: State Data Centre (SDC) sovereign cloud deployment, Cloudflare/NIC WAF, OWASP Top 10 hardening, and DPDP Act 2023 data minimization.
