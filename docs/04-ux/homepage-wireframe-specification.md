# Homepage Wireframe & Component Specification

## 1. Design Overview
A clean, accessible, mobile-first, light-themed portal prioritizing citizen needs over administrative ceremony. Uses primary brand `#004B87` with high contrast, crisp typography, and zero unoptimized image carousels.

## 2. Layout Hierarchy & Components

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. GIGW Utility Top Bar: Portal Title | Skip Content | Contrast | Lang │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Main Brand Header: State Emblem | TN Portal 2.0 | Helplines (1100)  │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Hero Section (TN Blue #004B87):                                     │
│    - Tagline: "How can the Government assist you today?"               │
│    - Universal Semantic Search Bar (Bilingual with auto-suggest)       │
│    - Grounded AI Citizen Assistant Card (Dynamic expander)             │
│    - Popular Search Pills (Patta, Community Cert, Pension, G.O.s)      │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Primary Content:                                                    │
│    - Section A: 6 Life-Event Service Cards (Certificates, Land, etc.)  │
│    - Section B: Unified Application Status Tracker (4-Stage Progress)  │
│    - Section C: Direct Portal Shortcuts (P0 Contact Directory, G.O.s)  │
│    - Section D: State Leadership & Announcements                       │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Footer: Mandatory Official Links | GIGW 3.0 / WCAG 2.2 | NIC/TNeGA  │
└────────────────────────────────────────────────────────────────────────┘
```

## 3. Component Details & Behavior

### 1. Universal Semantic Search Bar
- Prominent input field in hero section.
- Debounced (300ms) query dispatching to `/api/v1/search/hybrid` and `/api/v1/rag/query`.
- Expandable AI Assistant card rendering verbatim eligibility rules, required documents, and source citations without navigating away.

### 2. 6 Life-Event Service Cards Grid
- 1. Identity & Civil Registration (`FileText`)
- 2. Agriculture & Farmer Welfare (`Tractor`)
- 3. Land Administration & Patta (`MapPin`)
- 4. Education, Scholarships & Jobs (`GraduationCap`)
- 5. Social Welfare & Pensions (`ShieldCheck`)
- 6. Business, MSME & Commercial Licences (`Briefcase`)
- Each card highlights active service count, statutory SLA guarantee badge, and direct deep-link.

### 3. Unified Application Tracker
- Persistent tracking input box accepting 8–12 alphanumeric application IDs.
- Animated 4-stage stepper:
  1. Application Filed -> 2. Field Verification -> 3. Officer Scrutiny -> 4. Certificate Issued.
- Displays target statutory SLA completion date and current jurisdictional office.

### 4. Accessibility & GIGW Conformance
- High contrast toggle (Black/White high contrast mode).
- Bilingual toggle switching between Tamil (`தமிழ்`) and English (`en`).
- Skip to main content link (`#main-content`) accessible via Tab key.
- Strict WCAG 2.2 AA compliant contrast ratio (> 4.5:1).
