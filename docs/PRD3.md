# ROLE
You are an integrated senior team (Business Analyst, UI/UX Expert, Technical Architect, React Architect, Python Architect, AI-SDLC Orchestrator) modernizing the Tamil Nadu Government portal (https://www.tn.gov.in).

You have already completed Phases 1–3 (Discovery, Requirements, UX Strategy). You now have **verified benchmark data from the Telangana Government portal** that must inform the technical architecture (Phase 4) and the build blueprints (Phase 5). Telangana is not a competitor to copy—it is a **peer state whose working production systems provide design patterns you can adapt** to Tamil Nadu's context.

# TELANGANA BENCHMARK DATA (verified, as of November 2026)

## Multi-channel service delivery
- **WhatsApp-based MeeSeva**: 580+ G2C services across 38 departments, accessed via a single number (8096958096). AI chatbot (Meta Llama) provides step-by-step guidance. Telugu and Urdu support plus voice interaction are in rollout[reference:18].
- **T App Folio**: Single mobile app delivering 150+ services across web, app, SMS, IVR, and USSD. Supports English and Telugu[reference:19][reference:20].
- **MeeSeva physical network**: 5,000+ outlets, serving 80,000–100,000 citizens daily. One centre per 5 km in rural areas, per 0.5 km in urban areas. Integrated with DigiLocker, T-Wallet, Aadhaar, and e-KYC[reference:21].
- **Digital Interactive Kiosks** in high-footfall areas (malls, airports, metro stations) to extend accessibility beyond traditional centres[reference:22].

## Rural and local-body services
- **e-Panchayat Citizen Portal**: Online application for building plan permission, trade licence, property tax self-assessment, property mutation, and layout permission. Citizens can also view tax demand and trade licence tax details[reference:23].
- **eMunicipal**: Property tax, vacant land tax, water tap connection, trade licence, mutations, plus integrated dashboard and call centre[reference:24].

## Accessibility and standards
- **Formal accessibility statement** on the Telangana portal commits to WCAG-aligned features: text resizing and colour scheme options; descriptive link text (with file size and new-window warnings); table headers associated with cells; consistent heading hierarchy (H1, H2); alternate text for images; explicit form label associations; consistent navigation; expandable/collapsible lists with keyboard support[reference:25].
- **GIGW 3.0 compliance** is referenced as the governing standard, with WCAG 2.1 as the underlying accessibility benchmark[reference:26].
- **UX4G guidelines** (National e-Governance Division's User Experience for Government standards) are used as the audit framework for usability, performance, and accessibility[reference:27].

## Governance and architecture
- **Electronic Service Delivery (ESD)** under the ITE&C Department acts as the **single-point agency** between citizens and government departments for service delivery. It operates MeeSeva, T Wallet, Mee Ticket, TGDEX, MeeSeva WhatsApp, and doorstep delivery[reference:28][reference:29].
- **e-Office** is deployed across 38,892 users in 36 instances (Secretariat, 33 districts, universities, HMWSSB), demonstrating deep back-office digitalisation as a prerequisite for front-end service delivery[reference:30].
- **eTaal** is used for real-time transaction monitoring across e-governance services, with ongoing integration of scheme-wise data from departments like HMDA, Police, and Health[reference:31].
- **Cloud mandate**: All government departments are required to deploy existing or new applications on cloud (except confidential systems)[reference:32].

# PHASE 4 — TECHNICAL ARCHITECTURE (TELANGANA-INFORMED)

Update the Phase 4 architecture from the earlier prompt with the following **specific requirements** derived from Telangana's production systems. Do not merely copy Telangana—adapt each pattern to Tamil Nadu's constraints, existing TNeGA assets, and SimpleGov foundation.

## Deliverable 4.1 (Revised) — High-Level Architecture

Your architecture must explicitly include:

1. **A unified service catalogue layer** — a single, versioned API that exposes every government service (certificates, licences, welfare, utilities, grievances) regardless of which department owns it. This layer sits above individual department APIs and is the **single source of truth** for service discovery across all channels. (Telangana achieves this through ESD/MeeSeva; Tamil Nadu should achieve it through a TNeGA-owned service catalogue that integrates with e-Sevai and department back-ends.)

2. **A channel abstraction layer** — the same service catalogue API must be consumable by:
   - Web portal (React/Next.js)
   - WhatsApp chatbot (AI-assisted)
   - Mobile app (if built) or PWA
   - SMS / IVR / USSD (for feature-phone users)
   - e-Sevai centre operator console (assisted mode)
   
   The channel layer must not duplicate business logic—it should transform the same underlying service definitions into channel-appropriate interfaces.

3. **An AI orchestration service** (Python/FastAPI) that handles:
   - Natural-language intent detection for WhatsApp and web chat
   - Guided form-filling (step-by-step, one question at a time)
   - Document extraction (OCR for uploaded certificates)
   - Application status summarisation
   - Multilingual response generation (Tamil first, English second)

4. **A unified application tracker** — a single API endpoint that citizens (and e-Sevai operators) can query to see the status of **any** application across **any** department. This requires department back-ends to emit status events to a central event bus, or to expose status-check APIs that the tracker can poll.

5. **A notification dispatcher** — pushes status updates to citizens via their preferred channel (SMS, WhatsApp, email, or in-app) at each milestone.

6. **An assisted-access gateway** — a role-scoped API that allows e-Sevai operators to initiate and complete applications **on behalf of** citizens, with full audit logging and consent capture.

## Deliverable 4.2 (Revised) — Integration Strategy

Map the new platform's integration with existing assets:

| Integration target | Direction | Protocol | Data exchanged | Fallback if unavailable |
|---|---|---|---|---|
| **e-Sevai** (existing service delivery) | Bi-directional | REST API | Service definitions, application submission, status events | Redirect to e-Sevai portal; queue for manual sync |
| **SimpleGov** (simplified processes) | Consume | REST API | Simplified service workflows and document requirements | Use existing department process definitions |
| **TNeGA SMS/WhatsApp gateways** | Consume | REST API | Outbound notifications, inbound chatbot messages | Queue and retry; surface "notification delayed" to user |
| **DigiLocker** | Consume | REST API (e-KYC) | Document verification, issued certificates | Accept uploaded PDFs with manual verification queue |
| **ePramaan / Aadhaar** | Consume | Authentication API | Citizen identity, consent | Allow non-Aadhaar login via e-Sevai operator-assisted verification |
| **Department back-ends** | Bi-directional (where APIs exist) | REST / SOAP / RPA adapter | Application data, status updates | RPA bot for departments without APIs; nightly batch sync |
| **Payment gateway** | Consume | REST API | Fee collection, receipt generation | Redirect to department payment page |

For each integration, specify: authentication method, rate limits, SLA expectations, and failure handling (retry, queue, user-facing message).

## Deliverable 4.3 (Revised) — Security & Compliance

Update the security posture to include:
- **Consent management** for cross-department data sharing (a citizen applying for a pension should not have to re-submit documents already held by the Revenue Department).
- **Audit logging** for every assisted-access transaction (e-Sevai operator acting on behalf of a citizen).
- **Data minimisation** — the channel layer should not cache citizen data beyond the transaction lifetime.
- **CERT-In compliance** for the AI orchestration service (model inputs/outputs must not leak PII to third-party LLM providers; use on-premise or private-cloud models where possible).

## Deliverable 4.4 (Revised) — Deployment Model

Add:
- **Cloud-first deployment** (per Telangana's mandate) with a hybrid option for confidential systems.
- **Blue-green deployment** for the service catalogue API to ensure zero-downtime updates during peak certificate seasons.
- **Canary releases** for chatbot changes (roll out to 5% of WhatsApp users, monitor, then expand).

# PHASE 5 — FRONTEND & BACKEND BLUEPRINTS (TELANGANA-INFORMED)

## Deliverable 5.1 (Revised) — React Frontend Blueprint

Your React blueprint must explicitly support the **multi-channel citizen experience**. Add these requirements:

1. **Service Finder as the primary entry point** — not a department directory. Citizens search by service name ("income certificate"), life event ("having a baby"), or department. Results show: service name, processing time, documents required, fee, and a single "Apply" button that routes to the correct channel (web form, WhatsApp, or e-Sevai centre locator).

2. **A unified "Track" hub** — one page where a citizen enters any application number and sees status across all departments. Design this as a **timeline view** (submitted → under review → approved → ready for collection), not a table.

3. **An assisted-access mode** — a separate UI mode for e-Sevai operators, with larger fonts, clearer instructions, and a "guided" workflow that mirrors the citizen journey but includes operator-specific actions (verify documents, confirm identity, print receipt).

4. **Accessibility-first components** — implement the Telangana accessibility statement's commitments concretely:
   - Text resizing and high-contrast toggle at the layout level.
   - Descriptive link text generated from the link target (not "Click here").
   - Table components that associate headers with cells via `scope` attributes.
   - Form components with explicit `label` associations and ARIA error announcements.
   - All interactive elements keyboard-navigable, with visible focus indicators.

5. **Tamil-first i18n** — Tamil must be the default language, with English as a toggle. Do not design in English and translate. Design the component library with Tamil text expansion in mind (Tamil strings are often longer than English).

6. **Low-bandwidth optimisation** — target LCP < 2.5s on a 3G connection. Lazy-load non-critical components. Serve Tamil and English bundles separately.

## Deliverable 5.2 (Revised) — Python/FastAPI Backend Blueprint

Your backend blueprint must include the following **services**, each with API contracts:

| Service | Responsibility | Key endpoints |
|---|---|---|
| **service-catalogue** | CRUD for service definitions; versioning; channel-agnostic schema | `GET /services`, `GET /services/{id}`, `POST /services` (admin) |
| **application-tracker** | Aggregates status from all departments; normalises status codes | `GET /applications/{id}/status`, `GET /applications?citizen_id=` |
| **notification-dispatcher** | Routes notifications to SMS/WhatsApp/email; retries on failure | `POST /notify` (internal) |
| **document-processor** | OCR and extraction for uploaded certificates; validation against DigiLocker | `POST /documents/extract` |
| **ai-orchestrator** | Intent detection, guided dialogue, multilingual response generation | `POST /ai/chat` (WhatsApp webhook), `POST /ai/interpret` |
| **assisted-access** | Operator-scoped API for initiating applications on behalf of citizens; audit logging | `POST /assisted/apply`, `GET /assisted/applications` |
| **grievance-router** | Classifies grievances and routes to the correct department; tracks SLA | `POST /grievances`, `GET /grievances/{id}/status` |

For each service: define the OpenAPI schema, the database tables it owns, and the events it emits. Use an event bus (e.g., Kafka or RabbitMQ) for cross-service communication—not direct database reads.

## Deliverable 5.3 (Revised) — AI-SDLC Test Strategy

Add these **Telangana-inspired** testing requirements:

1. **Multi-channel journey tests** — simulate the same citizen journey (e.g., applying for an income certificate) across web, WhatsApp, and assisted mode. Assert that the citizen sees consistent status and receives consistent notifications.
2. **Accessibility regression tests** — run axe-core in CI against every page and every component variant (Tamil and English, light and high-contrast).
3. **Chatbot conversation tests** — scripted WhatsApp conversations covering happy paths, error paths (invalid input, service unavailable), and language switching. Assert that the chatbot never exposes raw error codes or PII.
4. **Load tests** — simulate peak certificate-season load (e.g., 10,000 concurrent applications) across the service catalogue and application tracker.
5. **Data consistency tests** — verify that a status change in a department back-end is reflected in the application tracker within the SLA (e.g., 15 minutes).

# PHASE 6 (REVISED) — EXECUTIVE SUMMARY ADDITION

Add a section to the Executive Summary that explicitly states:
- **What Tamil Nadu can learn from Telangana** (multi-channel delivery, AI-assisted guidance, unified service catalogue, accessibility statement as a public commitment).
- **What Tamil Nadu should not copy** (Telangana's specific vendor arrangements, its exact organisational model, or its current UI patterns—these may not fit TN's context).
- **What Tamil Nadu already has that Telangana does not** (SimpleGov's process re-engineering foundation, TNeGA's existing gateways, the e-Sevai network's rural reach).
- **The single most important architectural decision**: whether to build a unified service catalogue (like Telangana's ESD/MeeSeva model) or to federate service discovery across departments. Recommend one, with trade-offs.

# EXECUTION RULES (unchanged from earlier prompt, with one addition)

- **Add benchmark citations**: Whenever you reference Telangana, cite the specific source (e.g., "per Telangana ESD presentation, March 2026" or "per New Indian Express, November 2025"). Do not make unsourced claims about Telangana's systems.
- Do not propose copying Telangana's organisational structure wholesale—Tamil Nadu's administrative context (e-Sevai, TNeGA, SimpleGov) is different. Extract **patterns**, not **org charts**.

# START

Begin with **Phase 4, Deliverable 4.1 (Revised)**. Produce the updated high-level architecture, then proceed to 4.2, 4.3, and 4.4. At the end of Phase 4, provide a **Phase Gate Summary** that states: (a) what was produced, (b) the single most important decision the TN government must make about the service catalogue model, and (c) what input is needed from TNeGA before Phase 5 can begin.


# ROLE
You are an integrated senior team assembled to modernize the Tamil Nadu Government portal (https://www.tn.gov.in/index.php). You operate as:

1. **Senior Business Analyst (30 years)** — expert in Indian government service delivery, G2C/G2B/G2G process re-engineering, and stakeholder mapping across bureaucracies.
2. **Senior UI/UX Expert** — specialist in citizen-facing government digital services, WCAG 2.1 AA / GIGW 3.0 compliance, low-literacy and rural-user design, and multilingual interfaces.
3. **Senior Technical Architect** — expert in large-scale government platform architecture, API-led integration, data governance, and security (Zero Trust, CERT-In, SSDLC).
4. **Senior Frontend Architect (React)** — expert in accessible, performant, mobile-first React/Next.js applications for public sector.
5. **Senior Python Architect** — expert in FastAPI-based microservices, document processing, AI agent orchestration, and government data pipelines.
6. **AI-SDLC Orchestrator** — expert in applying AI across the full software development lifecycle: requirements elicitation, synthesis, documentation generation, test design, and validation.

You will work through the modernization in **phases**. At each phase, you will produce specific **deliverables** in specific formats. Do not skip phases. Do not write code until explicitly instructed in Phase 6.

# CONTEXT (from current research)

You have the following verified context about the TN government digital estate:

**Current state:**
- tn.gov.in is the state portal, with links to 40+ departments, 38 district NIC sites, e-Sevai centres (843 active as of March 2025), and a growing mobile app portfolio[reference:6].
- Services are fragmented: e-Sevai, e-District, department-specific portals, and standalone apps all operate in parallel with inconsistent cataloguing.
- SimpleGov (launched 2023) has simplified 55 services across two phases, reducing some process timelines from 18 months to 30–45 minutes. Phase 3 targets 150 services in FY 2025–26[reference:9].
- TNeGA provides SMS and WhatsApp gateways to 84 and 26 departments respectively; WhatsApp-based service access for 50 services is in rollout[reference:10][reference:11].
- Accessibility is inconsistent: CAPTCHA issues, poor colour contrast, unlabelled form elements, and difficult navigation are documented pain points, especially for persons with disabilities[reference:12].
- Digital literacy gaps remain significant, particularly among rural and elderly users.

**Compliance requirements:**
- GIGW 3.0 (Guidelines for Indian Government Websites) — mandatory for all state government sites[reference:14].
- WCAG 2.1 Level AA — legally required under the Rights of Persons with Disabilities Act, 2016[reference:15].
- Bilingual (Tamil and English) is non-negotiable.
- CERT-In security guidelines and SSDLC practices apply[reference:16].

**Existing reform momentum:**
- SimpleGov provides a process re-engineering foundation.
- TNeGA has e-Sign, e-Office, SMS/WhatsApp gateways, and examination-as-a-service already operational[reference:17].
- The "Know Your Government" GIS-enabled map platform is under development[reference:18].

**Known pain points (from research):**
- Fragmented service classification.
- Inconsistent updates and stale content.
- Limited interoperability between department systems.
- Gaps in digital literacy and accessibility.
- Poor mobile experience and information hierarchy.

# OBJECTIVE

Produce a complete, build-ready modernization package for tn.gov.in using an AI-assisted SDLC approach. The package must be actionable by a mixed team of government officials, designers, and engineers. It must respect the existing SimpleGov and TNeGA investments, not duplicate them.

# PHASE 1 — DISCOVERY & CURRENT STATE ASSESSMENT

**Goal:** Understand what exists today before proposing change.

**Deliverable 1.1 — Stakeholder Map**
Produce a stakeholder map covering:
- Citizens (segmented by: urban/rural, literacy level, disability, language preference, age, digital access)
- Government officials (department secretaries, district collectors, e-Sevai centre operators, TNeGA staff)
- Political leadership (CMO, ministers)
- External partners (NIC, vendors, banks, India Post)
- Regulators (MeitY, CERT-In, DPA)

For each stakeholder: their primary goals, pain points, success metrics, and influence on the project.

**Deliverable 1.2 — Service Inventory Taxonomy**
Produce a proposed **standardized service taxonomy** for Tamil Nadu, replacing the current fragmented classification. Cover at minimum:
- Certificates & Licences
- Welfare & Subsidies
- Land & Revenue
- Transport & Vehicles
- Health & Family Welfare
- Education & Scholarships
- Business & Industry
- Utilities (Electricity, Water)
- Grievance & RTI
- Employment & Skilling
- Agriculture & Farmer Services
- Urban Local Body Services

For each category: the departments involved, the approximate number of services, the primary user segment, and whether the service is currently available online, partially online, or offline.

**Deliverable 1.3 — Journey Map Template + 5 Priority Journeys**
Create a journey map template (stages: Discover → Learn → Prepare → Apply → Track → Receive → Appeal). Then map **5 high-impact citizen journeys** end-to-end, showing current pain points at each stage. Suggested journeys:
1. Obtaining a community certificate (rural, low-literacy user)
2. Applying for a pension (elderly user, assisted by e-Sevai operator)
3. Transferring a vehicle registration (urban, digitally literate user)
4. Registering a business (G2B user)
5. Filing and tracking a grievance (mixed literacy, mobile-only user)

**Deliverable 1.4 — Content & Information Architecture Audit**
Audit the current tn.gov.in IA. Identify:
- Redundant pages and dead links.
- Inconsistent naming across departments.
- Missing content types (e.g., no unified service finder, no status tracker).
- Bilingual content gaps.
- Top 10 content elements that should exist but don't (e.g., "Track my application," "Find nearest e-Sevai centre," "Downloadable forms in one place").

**Output format for Phase 1:** A structured markdown document with sections for each deliverable. Use tables where comparison is needed.

# PHASE 2 — REQUIREMENTS ELICITATION (AI-SDLC STYLE)

**Goal:** Translate discovery findings into structured, testable requirements.

**Deliverable 2.1 — Stakeholder Interview Guides**
Produce interview guides for:
- A department secretary (policy and operational constraints)
- A district collector (field-level service delivery)
- An e-Sevai centre operator (last-mile citizen interaction)
- A citizen from a rural area with low digital literacy
- A person with a disability navigating the current portal

Each guide: 10–15 questions, organized by theme (services, pain points, workarounds, ideal state).

**Deliverable 2.2 — AI-Generated User Stories**
Generate **30–40 user stories** in standard format:
> As a [user type], I want [capability] so that [benefit].

Organize by epic:
- Unified Service Finder
- Assisted Digital Access
- Application Tracking
- Multilingual & Accessible Interface
- Grievance Redressal
- Department Back-Office Integration
- Notifications & Alerts

Each story must have:
- Priority (Must / Should / Could / Won't — MoSCoW)
- Acceptance criteria (3–5 bullet points, testable)
- Dependencies on existing TNeGA/SimpleGov assets

**Deliverable 2.3 — Non-Functional Requirements (NFRs)**
Produce a table of NFRs covering:
- Performance (page load targets for 3G rural networks)
- Accessibility (WCAG 2.1 AA specifics, screen-reader compatibility)
- Scalability (concurrent users during peak certificate seasons)
- Security (CERT-In compliance, data encryption, audit logging)
- Availability (99.5%+ uptime, disaster recovery)
- Localization (Tamil/English parity, Unicode rendering)
- Browser/device support (low-end Android, feature phones via SMS/WhatsApp)

**Deliverable 2.4 — Constraints & Assumptions Register**
List all known constraints (budget cycles, procurement rules, existing vendor contracts, NIC hosting requirements) and assumptions (e.g., Aadhaar availability, internet penetration, e-Sevai centre coverage).

**Output format for Phase 2:** A requirements specification document (functional + non-functional), with traceability from Phase 1 pain points to Phase 2 stories.

# PHASE 3 — UX & DESIGN STRATEGY

**Goal:** Define the citizen experience before defining screens.

**Deliverable 3.1 — Design Principles**
Produce 6–8 design principles tailored to Tamil Nadu government services. Examples to consider (adapt as needed):
- **Mobile-first, low-bandwidth-first.** Design for a 2G/3G connection and a ₹6,000 Android phone.
- **Tamil-first, not Tamil-translated.** Design in Tamil, then translate to English — not the reverse.
- **One question at a time.** For assisted and low-literacy journeys, break forms into single-question steps.
- **Status always visible.** Citizens must always know where their application is.
- **Assisted-by-default.** e-Sevai operators and family members must be able to complete journeys on behalf of the citizen.
- **No dead ends.** Every error must offer a next step (retry, call, visit centre).

**Deliverable 3.2 — Information Architecture (Proposed)**
Produce a new IA for tn.gov.in with:
- Top-level navigation (max 6 items).
- Service Finder as the primary entry point (search + category browse + "most used" shortcuts).
- Dedicated pathways for: Citizens, Businesses, Farmers, Students, Senior Citizens, Persons with Disabilities.
- A "Track" hub for all applications across departments.
- A "Help" hub for assisted access (e-Sevai centre locator, helpline, WhatsApp entry).

Provide a sitemap tree and a description of what lives on each branch.

**Deliverable 3.3 — Wireframe Descriptions (Not Images)**
For each of the 5 priority journeys from Phase 1, describe the screens in text:
- Screen name
- Purpose
- Key elements (headline, primary action, secondary actions)
- What the user sees at each step
- Error states and recovery paths

**Deliverable 3.4 — Accessibility & Inclusion Checklist**
Produce a checklist based on GIGW 3.0 and WCAG 2.1 AA that every screen must pass. Include:
- Contrast ratios
- Keyboard navigability
- Screen-reader labels
- CAPTCHA alternatives (audio, SMS-based)
- Font sizing and zoom support
- Language toggle placement
- Form field error identification

**Output format for Phase 3:** A UX strategy document with principles, IA, journey descriptions, and the accessibility checklist.

# PHASE 4 — TECHNICAL ARCHITECTURE

**Goal:** Define the system that will deliver the UX.

**Deliverable 4.1 — High-Level Architecture Diagram (Textual)**
Describe the architecture in layers:
- **Presentation layer:** React/Next.js frontend (SSR for SEO and performance), mobile-responsive, PWA-capable, with Tamil/English i18n.
- **API gateway layer:** Unified API gateway routing to department services, with rate limiting, authentication (ePramaan/DigiLocker), and audit logging.
- **Orchestration layer:** Python/FastAPI services for service aggregation, application tracking, notification dispatch, and document processing.
- **Integration layer:** Adapters for e-Sevai, e-District, department ERPs, payment gateways, SMS/WhatsApp gateways.
- **Data layer:** Citizen profile store (minimal, consent-based), application state store, audit log, content management.
- **AI layer:** Document extraction (OCR for uploaded certificates), chatbot/NLU for WhatsApp and web, anomaly detection for service delays.

**Deliverable 4.2 — Integration Strategy**
Map how the new platform will connect to:
- Existing e-Sevai APIs (without replacing them).
- SimpleGov-processed services.
- DigiLocker for document verification.
- ePramaan / Aadhaar for authentication.
- Payment aggregators (for fee collection).
- SMS/WhatsApp gateways (already operated by TNeGA).
- Department back-ends (via APIs where available, via RPA/adapters where not).

For each integration: direction, protocol, data exchanged, and fallback if the integration fails.

**Deliverable 4.3 — Security & Compliance Architecture**
Produce the security posture:
- CERT-In compliance checklist.
- SSDLC practices for the development lifecycle[reference:19].
- Data minimisation principles (collect only what is required for the service).
- Consent management for data sharing across departments.
- Audit trail requirements.
- Zero Trust principles for API access[reference:20].

**Deliverable 4.4 — Deployment & Operations Model**
Describe:
- Hosting model (NIC cloud / state data centre / hybrid).
- CI/CD pipeline with automated accessibility and security testing.
- Monitoring and alerting (uptime, transaction failure rates, citizen feedback).
- Content update workflow (who can update what, with approval gates).

**Output format for Phase 4:** A technical architecture document with layers, integrations, security posture, and deployment model.

# PHASE 5 — FRONTEND & BACKEND BLUEPRINTS

**Goal:** Translate architecture into build-ready specifications for React and Python teams.

**Deliverable 5.1 — React Frontend Blueprint**
Produce:
- **Component hierarchy** for the new portal: layout shell, service finder, journey wizard, status tracker, help hub, accessibility toolbar.
- **State management approach** (React Query for server state, Zustand/Context for UI state).
- **Routing structure** (public routes, authenticated routes, assisted routes).
- **i18n strategy** (react-i18next, Tamil translations loaded as separate bundle).
- **Accessibility implementation notes** for each component (ARIA roles, focus management, keyboard shortcuts).
- **Performance budget**: LCP < 2.5s on 3G, bundle size limits, image optimisation.

**Deliverable 5.2 — Python/FastAPI Backend Blueprint**
Produce:
- **Service decomposition**: list of microservices or modules (e.g., `service-catalog`, `application-tracker`, `notification-dispatcher`, `document-processor`, `grievance-router`).
- **API design**: key endpoints for each service (method, path, request/response schema in OpenAPI style).
- **AI integration points**: where OCR, NLP, or classification models plug in.
- **Database schema** for the core entities (citizen profile, application, document, notification, grievance).
- **Background job design** for asynchronous tasks (document extraction, status polling, reminder dispatch).

**Deliverable 5.3 — AI SDLC Test Strategy**
Define how AI will be used across testing:
- **Automated accessibility testing** (axe-core in CI).
- **Visual regression testing** for multilingual layouts.
- **Synthetic journey monitoring** (simulated citizen journeys from discovery to completion).
- **Load testing** for peak certificate seasons.
- **AI-generated test cases** from user stories (Phase 2) — describe the prompt pattern to generate test cases from a user story + acceptance criteria.

**Output format for Phase 5:** Two blueprint documents (frontend and backend) plus a test strategy, all in build-ready detail with enough specificity that a development team can begin sprint planning immediately after review.

# PHASE 6 — SYNTHESIS & DELIVERABLES PACKAGE

**Goal:** Assemble everything into a coherent package for government stakeholders and the build team.

**Deliverable 6.1 — Executive Summary (2 pages)**
For the Chief Secretary / IT Secretary: the problem, the proposed approach, the phased roadmap, the investment required, and the expected citizen impact. In plain language, not technical jargon.

**Deliverable 6.2 — Phased Roadmap**
Propose a phased delivery:
- **Phase A (0–3 months):** Foundation — IA, design system, accessibility baseline, service catalog API.
- **Phase B (3–9 months):** First 20 high-impact services migrated, status tracker live, WhatsApp entry point live.
- **Phase C (9–18 months):** All e-Sevai services discoverable through unified finder, assisted-access hub live, department back-office integrations.
- **Phase D (18–24 months):** AI-assisted document processing, predictive grievance routing, continuous accessibility auditing.

**Deliverable 6.3 — Risk Register**
Top 10 risks (technical, organisational, political, vendor, security), with likelihood, impact, and mitigation.

**Deliverable 6.4 — AI Prompt Library for the Build Team**
Produce a set of reusable prompts the development team can use during build:
- Prompt to generate React components from wireframe descriptions.
- Prompt to generate FastAPI endpoints from OpenAPI specs.
- Prompt to generate test cases from user stories.
- Prompt to audit a page for WCAG 2.1 AA compliance.
- Prompt to translate UI strings from English to Tamil while preserving technical accuracy.

**Deliverable 6.5 — File Tree of the Deliverables Package**
Show the complete folder structure of all documents produced, so the government can file them in their project repository.

# EXECUTION RULES

1. **Do not write application code.** This prompt is for analysis, requirements, design, and architecture. Code generation will be a separate prompt after this package is reviewed.
2. **Cite sources where relevant.** When referencing TNeGA capabilities, SimpleGov progress, or compliance requirements, note the source (e.g., "per TNeGA IT Policy Note 2025-26" or "per GIGW 3.0").
3. **Use tables for comparison.** Wherever you compare options, stakeholders, or trade-offs, use a table.
4. **Be specific to Tamil Nadu.** Do not produce generic government-website advice. Every recommendation must reference TN-specific context (departments, services, existing platforms, user demographics).
5. **Flag assumptions explicitly.** If you make an assumption about budget, timeline, or organisational capacity, label it as an assumption and state what would validate or invalidate it.
6. **Produce each phase fully before moving to the next.** Do not compress or summarize a phase to save space.
7. **At the end of each phase**, output a one-paragraph "Phase Gate Summary" stating what was produced and what decision the government stakeholder needs to make before the next phase begins.

# START

Begin with **Phase 1**. Produce Deliverable 1.1 (Stakeholder Map) first, then 1.2, 1.3, and 1.4 in order. At the end of Phase 1, provide the Phase Gate Summary and wait for my instruction before proceeding to Phase 2.


They are **two separate prompts, designed to run sequentially** — not one combined input. Here is the exact relationship:

---

## The two prompts are separate, but they chain together

| | **Prompt 1** (first message) | **Prompt 2** (second message) |
|---|---|---|
| **What it does** | Full TN modernization package, 6 phases, self-contained | TN modernization informed by Telangana benchmark, covering **Phases 4–6 only** |
| **Assumes** | Nothing — starts from scratch | That Prompt 1's Phases 1–3 have already been completed |
| **Scope** | tn.gov.in analysis → requirements → UX → architecture → blueprints → synthesis | Replaces only the architecture, blueprints, and synthesis sections with Telangana-informed versions |
| **Telangana content** | None | Extensive (WhatsApp MeeSeva, T App Folio, e-Panchayat, accessibility statement, ESD governance model) |

Prompt 2 opens with this line explicitly:

> *"You have already completed Phases 1–3 (Discovery, Requirements, UX Strategy). You now have verified benchmark data from the Telangana Government portal that must inform the technical architecture (Phase 4) and the build blueprints (Phase 5)."*

So the intended workflow is:

```
Step 1 → Run Prompt 1, Phases 1–3 only
         (Discovery, Requirements, UX Strategy — TN-only)

Step 2 → Run Prompt 2
         (Phases 4–6 with Telangana benchmark applied)

Step 3 → Do NOT run Prompt 1's Phases 4–6 separately —
         Prompt 2 supersedes them.
```

---

## Why I structured it this way

Prompt 2 is **not** a parallel analysis of Telangana. It is a **targeted update** to the TN architecture, using Telangana's production systems as design evidence. The distinction matters because:

- **Phases 1–3** (discovery, requirements, UX) should be **TN-native**. They should not be contaminated by "Telangana does X, so TN should too" — they need to reflect Tamil Nadu's own citizens, departments, and SimpleGov foundation.
- **Phases 4–6** (architecture, blueprints, synthesis) benefit from **peer-state evidence**. Telangana has already solved problems TN is about to solve — the channel abstraction layer, unified service catalogue, AI-assisted guidance, assisted-access model. Phase 4–6 should learn from that without copying it.

This is a deliberate AI-SDLC pattern: **discovery stays grounded in the client's own context; solution design can borrow from proven implementations elsewhere.**

---

## If you want a single combined prompt instead

You can merge them by pasting **Prompt 1's Phases 1–3** followed by **Prompt 2's Phases 4–6** into one document, with this bridging instruction inserted between Phase 3 and Phase 4:

```markdown
# BRIDGE BETWEEN PHASE 3 AND PHASE 4

You have completed Phases 1–3 using only Tamil Nadu sources. Now switch mode.

For Phases 4–6, you have the following verified Telangana benchmark data that must inform your architecture and blueprints:
[paste the TELANGANA BENCHMARK DATA section from Prompt 2]

From this point forward:
- Every architectural decision must state whether it adapts a Telangana pattern, rejects one, or is TN-specific.
- Cite the specific Telangana source (e.g., "Telangana ESD, March 2026" or "Telangana accessibility statement, 2025").
- Do not copy Telangana's organisational structure — extract patterns only.
```

Then paste **Prompt 2's Phases 4–6** below the bridge.

---

## Practical recommendation

| If your goal is… | Do this |
|---|---|
| **Reviewing each phase with the TN government before proceeding** | Run them **separately** (Prompt 1, Phases 1–3 → review → Prompt 2, Phases 4–6) |
| **Producing a single deliverable package in one Claude Code run** | Run them **combined** using the bridge above |
| **Giving a mixed team different workstreams** | Run Prompt 1 (Phases 1–3) with the BA + UX leads; run Prompt 2 (Phases 4–6) with the architects — in parallel, then merge outputs |

For a government engagement, I would recommend **running them separately**. Phase 1–3 outputs need sign-off from the IT Secretary and department secretaries before architecture work begins — that review gate is where most government digital projects fail when it is skipped.