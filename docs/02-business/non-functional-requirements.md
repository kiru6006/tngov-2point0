# Non-Functional Requirements Specification (NFRS)

## 1. Performance & Scalability (PERF)
- **NFR-PERF-01**: Gateway API response latency must remain under 50ms (p95) for cached/indexed directory queries.
- **NFR-PERF-02**: Web application Largest Contentful Paint (LCP) must not exceed 2.5 seconds on simulated 3G mobile connections (1.6 Mbps down, 150ms RTT).
- **NFR-PERF-03**: Total initial JavaScript payload budget for public citizen pages must be < 120KB gzipped.

## 2. Accessibility & Usability (A11Y)
- **NFR-A11Y-01**: Conformance to **GIGW 3.0** (Guidelines for Indian Government Websites) and **WCAG 2.2 Level AA**.
- **NFR-A11Y-02**: Contrast ratio between foreground text and background must meet or exceed 4.5:1 for standard text and 3:1 for large UI components.
- **NFR-A11Y-03**: Full keyboard navigability without focus traps; mandatory Skip to Main Content link.
- **NFR-A11Y-04**: Screen-reader friendly semantic markup with ARIA landmarks (`role="main"`, `aria-expanded`, `aria-label`).

## 3. Security, Privacy & Data Protection (SEC)
- **NFR-SEC-01**: Compliance with Indian **DPDP Act 2023**; zero citizen PII stored or logged without consent.
- **NFR-SEC-02**: Mandatory HTTP Security Headers: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy.
- **NFR-SEC-03**: Input sanitization and parameterized ORM queries to eliminate OWASP Top 10 injection vulnerabilities.
- **NFR-SEC-04**: Zero public LLM transmission: self-hosted sovereign bilingual embedding models.

## 4. Internationalization & Localization (I18N)
- **NFR-I18N-01**: 100% parity between Tamil (`தமிழ்`) and English (`en`) for core citizen content, services, official titles, and navigation labels.
- **NFR-I18N-02**: Proper Unicode rendering for Tamil characters without character clipping or encoding artifacts.
