# Accessibility & Inclusive Design Audit (GIGW 3.0 & WCAG 2.2 AA)

## 1. Compliance Criteria Audited
- **Color Contrast**: Primary brand `#004B87` against white exceeds 4.5:1 (actual ratio 7.42:1). High-contrast mode toggle supported.
- **Keyboard Navigation**: Skip-to-content links implemented (`#main-content`), sequential focus order preserved.
- **Screen Reader Support**: Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`), valid `aria-label` attributes on inputs and search triggers.
- **Bilingual Parity**: Dual-language parallel support in Tamil (`ta`) and English (`en`) across all 9 citizen routes.

## 2. Assisted Access Kiosk Mode
`web/src/app/assisted/page.tsx` was audited for inclusive accessibility at village and taluk e-Sevai centers. Key features include operator checklist, high-legibility interface, and printable receipt generation.
