# Contact Directory Functional & Administrative Audit

## 1. P0 Critical Capabilities Audit
- **Hierarchy & Separation**: Verifiable decoupling between `Person` (individual), `Position` (sanctioned post), and `PositionAssignment` (tenure).
- **Transfer Engine**: `/api/v1/admin/directory/transfers` atomically supersedes previous assignments (`is_current = FALSE`, sets `end_date`) and provisions target assignments with G.O. gazette tracking.
- **Maker-Checker Workflow**:
  - `POST /change-requests` creates `DRAFT`.
  - `POST /change-requests/{id}/submit` promotes to `PENDING_VERIFICATION`.
  - Maker identity is blocked from executing `APPROVE` (HTTP 403 Forbidden).
  - Only authorized reviewer promotes to `APPROVED`.

## 2. DPDP Data Minimization Verification
- Only official telephone, official email, and government office locations are surfaced on public directory endpoints.
- Residential phone numbers, personal mobile numbers, and personal emergency contacts are scrubbed.
