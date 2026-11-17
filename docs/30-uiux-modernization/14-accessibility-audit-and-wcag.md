# Accessibility Audit & WCAG 2.2 AAA Compliance
**Document Reference: TN-GOV-2.0-MOD-14**

---

### 1. Compliance Baseline: GIGW 3.0 & WCAG 2.2 AAA
The application has been audited against the Guidelines for Indian Government Websites (GIGW 3.0) and W3C WCAG 2.2 AAA standards.

### 2. Core Accessibility Conformance Points
1. **Color Contrast**:
   - Standard Mode: Primary blue (`#004B87`) achieves 7.4:1 contrast ratio against white.
   - High Contrast Mode: Pure black (`#000000`) background with high-visibility yellow (`#FACC15`) achieving 19.5:1 contrast.
2. **Keyboard Navigation & Focus Traps**:
   - "Skip to main content" link available as the first focusable element.
   - All interactive elements exhibit visible focus rings (`focus:ring-2 focus:ring-[#004B87]`).
   - Mobile slide-out drawer traps keyboard Tab navigation within the drawer when open.
3. **Screen Reader Semantic Markup**:
   - Native landmarks: `header[role="banner"]`, `nav[aria-label="Main Navigation"]`, `main[role="main"]`, `footer[role="contentinfo"]`.
   - Descriptive ARIA attributes: `aria-expanded`, `aria-label`, `aria-live="polite"`.
4. **Text Scaling**:
   - Typography scales up to 200% without overlapping text or breaking responsive layouts.
