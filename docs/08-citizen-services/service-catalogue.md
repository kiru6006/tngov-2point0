# Citizen Services Specification

## 1. Unified Citizen Service Catalogue
The service catalogue groups 250+ Tamil Nadu statutory citizen services by life events and citizen needs rather than bureaucratic departmental siloes:
- Certificates & Identity (Community, Income, Nativity, First Graduate, Legal Heir)
- Revenue & Disaster Management Services (Patta transfer, Chitta extracts)
- Land Records & Registration (Encumbrance Certificate, Guideline Value)
- Education & Scholarship Services
- Social Security & Welfare Pensions
- Agriculture & Farmer Subsidies

## 2. Invariant Data Model
Services reference shared `departments` and `positions` from the Contact Directory master:
- `service_id`: Canonical identifier (e.g. `certificates`, `land`, `agriculture`)
- `statutory_sla_days`: Binding Citizen Charter time limit (e.g., 7 to 30 days)
- `service_channel`: Online (e-Sevai) vs In-Person
- `fees`: Statutory prescribed fees (e.g., ₹60)
- `responsible_position_id`: FK to `positions.position_id` in Contact Directory
