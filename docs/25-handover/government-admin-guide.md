# Government Administrator Operational Guide

## 1. Administrative Responsibilities
Government administrators (Secretaries, Joint Secretaries, TNeGA Nodal Officers) use this guide to manage state master data:
- **Managing Departments & Districts**: Reviewing organizational units and jurisdiction boundaries.
- **Reviewing & Approving Directory Changes**:
  1. Access `/api/v1/admin/directory/change-requests`.
  2. Inspect proposed official contact modifications and gazette order references.
  3. Authorize or reject change via maker-checker workflow.
- **Recording Officer Transfers**:
  1. Submit transfer payload including person ID, previous position, new position, and G.O. gazette order number.
  2. The system atomically archives the prior tenure and provisions the new officeholder.
- **Data Quality Anomaly Oversight**:
  - Review conflicting phone records, unassigned active positions, and stale entries via `/api/v1/admin/directory/quality/metrics`.
