# Government Contact Directory Data Model (P0)

## Core Architectural Invariant
Positions exist independently of individuals. Do not store person and designation as single mutable record. Transfers update assignments, not position definitions.

## Schemas
### 1. Positions Table (`positions`)
- `position_id`: UUID (PK)
- `title_en`: VARCHAR(255)
- `title_ta`: VARCHAR(255)
- `department_id`: UUID (FK -> departments)
- `jurisdiction_id`: UUID (FK -> jurisdictions)
- `reports_to_position_id`: UUID (FK -> positions, Nullable)
- `cadre`: VARCHAR(50) (IAS, DRO, State Cadre)
- `status`: ENUM ('active', 'vacant', 'abolished')

### 2. Persons Table (`persons`)
- `person_id`: UUID (PK)
- `name_en`: VARCHAR(255)
- `name_ta`: VARCHAR(255)
- `official_email`: VARCHAR(255)
- `official_phone`: VARCHAR(50)
- `verification_status`: ENUM ('verified', 'pending', 'disputed')

### 3. Position Assignments Table (`position_assignments`)
- `assignment_id`: UUID (PK)
- `position_id`: UUID (FK -> positions)
- `person_id`: UUID (FK -> persons)
- `start_date`: DATE
- `end_date`: DATE (Nullable)
- `transfer_go_ref`: VARCHAR(100)
- `is_current`: BOOLEAN DEFAULT true
