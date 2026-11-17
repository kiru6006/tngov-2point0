# Three-State Comparative Benchmark & Gap Analysis

## 1. Overview
A systematic discovery and benchmark audit was conducted across three state portals:
1. **Tamil Nadu**: `https://www.tn.gov.in/` (Subject Portal)
2. **Telangana**: `https://www.telangana.gov.in/` (Benchmark 1 - Service integration via MeeSeva)
3. **Uttar Pradesh**: `https://up.gov.in/en` (Benchmark 2 - Citizen-category discovery & Jansunwai)

## 2. Benchmark Feature Matrix

| Feature ID | Category | Tamil Nadu (Legacy) | Telangana (Benchmark) | Uttar Pradesh (Benchmark) | Gap Identified | Recommendation | Priority |
|---|---|---|---|---|---|---|---|
| GAP-01 | Service Discovery | Department-siloed list (alphabetical dropdown) | MeeSeva unified catalog with category filters | Citizen segment navigation (Farmers, Youth, Women) | Citizen must know department before finding service | Implement Life-Event grouped catalog with universal search | P0 |
| GAP-02 | Contact Directory | Static HTML tables with stale landline numbers | Centralized directory by department & district | Searchable officers directory with designation filter | High staleness, no transfer history or verification | Independent Position/Person data model with Maker-Checker workflow | P0 |
| GAP-03 | Application Tracking | Redirects to external departmental URLs | Integrated application status checker | Unified Jansunwai / e-District tracking bar | Citizens lose portal context when tracking applications | Embedded 4-stage tracking progress bar with TNeGA proxy API | P0 |
| GAP-04 | Document Search | Year-based dropdown with unindexed scanned PDFs | Categorized G.O. repository with keyword search | Searchable Government Orders by department & subject | Scanned Tamil PDFs unsearchable via keyword | Multilingual OCR pipeline + Hybrid BM25/Vector RAG search | P1 |
| GAP-05 | Mobile & Accessibility | Desktop-fixed layout, small font sizes, low contrast | Responsive layout, basic a11y toggles | Responsive layout, font size adjustment, high contrast | Fails WCAG 2.2 AA mobile tap target and contrast rules | Mobile-first Tailwind design system with GIGW 3.0 / WCAG 2.2 AA | P0 |
| GAP-06 | Language Parity | Partial Tamil translations; administrative titles in English | Telugu and English toggle | Hindi and English toggle | Core technical notices and order titles remain untranslated | First-class bilingual parity with localized Tamil metadata | P0 |
| GAP-07 | Grievance Integration | External link to CM Helpline portal | Integrated grievance status check | Integrated Jansunwai tracking interface | Fragmented citizen grievance journey | Direct status proxy contract with CM Special Cell / Mudhalvar Mugavari | P1 |
