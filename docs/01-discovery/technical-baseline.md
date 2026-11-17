# Technical Baseline & Crawl Simulation Findings

- **Responsive Viewport**: Legacy Bootstrap grid. Tables and embedded PDFs cause horizontal overflow on mobile screens `[OBSERVED]`.
- **Core Web Vitals**: High CLS from delayed carousel load. TTI delayed by unoptimized legacy JS bundles `[INFERRED]`.
- **GIGW 3.0 / WCAG AA**:
  - Banner contrast fails 4.5:1 ratio `[OBSERVED]`.
  - Language toggle missing dynamic `lang` and `aria-label` attributes `[OBSERVED]`.
  - Focus outlines suppressed on dropdown menus `[OBSERVED]`.
- **Security**: Missing strict CSP and HSTS headers on legacy department directories `[INFERRED]`.
- **G.O. Search Access**: Government Orders gated behind POST query forms; requires targeted search scraping `[VERIFIED]`.
