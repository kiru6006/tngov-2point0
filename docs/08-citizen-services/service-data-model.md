# Citizen Services Data Model & API Contracts

## 1. Schema Definition
```sql
CREATE TABLE services (
    service_id VARCHAR(64) PRIMARY KEY,
    service_name_en VARCHAR(255) NOT NULL,
    service_name_ta VARCHAR(255) NOT NULL,
    department_owner VARCHAR(255) NOT NULL,
    department_id VARCHAR(64) REFERENCES departments(department_id),
    citizen_category VARCHAR(255) NOT NULL,
    eligibility_rules TEXT,
    required_docs TEXT,
    statutory_sla_days INTEGER DEFAULT 15,
    service_channel VARCHAR(100) DEFAULT 'Online (e-Sevai)',
    action_url VARCHAR(255),
    fees VARCHAR(100) DEFAULT '₹60 (Statutory)',
    responsible_position_id VARCHAR(64) REFERENCES positions(position_id)
);
```

## 2. API Endpoints
- `GET /api/v1/services`: List all services with category and department filtering.
- `GET /api/v1/services/{id}`: Detailed view including checklist and linked Contact Directory officer.
- `GET /api/v1/service-categories`: Dynamic distinct categories.
