# Frontend Integration Specification

## 1. Component Architecture
The React frontend integrates with the directory APIs via typed models and unified state:
- Page: `web/src/app/contact-directory/page.tsx`
- Tabs:
  - `table`: Directory search with instant client and server filter synchronization.
  - `leadership`: State Leadership cards (Governor, Chief Minister, Ministers, Chief Secretary).
  - `hierarchy`: Interactive administrative hierarchy tree.
  - `district`: 38 Revenue District Collectorates.
  - `transfer`: Officer transfer management console with conflict checking and audit token generation.
  - `verification`: Maker-Checker quarantine approval queue.
  - `quality`: Data quality dashboard displaying real-time database metrics.
  - Modal: `selectedOfficial` detail view with official phone, email, and G.O. references.

## 2. API Data Contract
The frontend expects `GET /api/v1/directory/contacts` returning `ContactListResponse` with bilingual fields (`name_en`, `name_ta`, `designation_en`, `designation_ta`, `department_en`, `department_ta`).
Fallback to static `/data/contacts.json` is preserved when offline or during static export.
