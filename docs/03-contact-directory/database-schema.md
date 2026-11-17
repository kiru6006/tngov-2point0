# Database Schema Specification

## 1. Normalized Entity Master
PostgreSQL with SQLAlchemy 2.x and Alembic schema (`aa364356d90b`).

| Table Name | Primary Key | Foreign Keys | Purpose |
|---|---|---|---|
| `directory_categories` | `category_id` | - | High-level directory categories (Leadership, Legislature, Dept, District, Boards) |
| `departments` | `department_id` | `category_id` | 45 Secretariat & Administrative Departments |
| `jurisdictions` | `jurisdiction_id` | - | State, 38 Districts, and Taluk administrative divisions |
| `offices` | `office_id` | `department_id`, `jurisdiction_id`, `parent_office_id` | Physical government offices & secretariats |
| `administrative_units` | `unit_id` | `office_id` | Wings, Zones, Regions, Circles, Divisions |
| `positions` | `position_id` | `department_id`, `office_id`, `jurisdiction_id` | Sanctioned civil posts |
| `persons` | `person_id` | - | Civil servants and official postholders |
| `position_assignments` | `assignment_id` | `position_id`, `person_id` | Temporal officer-position appointments |
| `official_contact_channels`| `channel_id` | `position_id`, `office_id` | Verified phone, email, fax, helpline endpoints |
| `reporting_relationships` | `rel_id` | `superior_position_id`, `subordinate_position_id` | Flexible administrative hierarchy |
| `source_documents` | `source_id` | - | Official Gazette notifications, website scrapes |
| `source_evidence` | `evidence_id` | `source_id` | Page numbers, bounding boxes, OCR text extracts |
| `verification_records` | `verification_id`| - | Maker-Checker verification audit trail |
| `change_requests` | `request_id` | `department_id`, `position_id`, `person_id` | 4-stage update requests |
| `approval_workflows` | `workflow_id` | `request_id` | Step-by-step role actions & reviewer comments |
| `audit_events` | `event_id` | - | Immutable compliance events |
| `department_nodal_officers`| `nodal_id` | `department_id`, `person_id` | Designated department editors & verifiers |
