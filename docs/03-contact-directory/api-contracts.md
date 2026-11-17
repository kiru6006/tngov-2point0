# Contact Directory API Contracts

## Public Endpoints
- `GET /api/v1/directory/contacts`: Paginated bilingual search by name, designation, department, district, cadre.
- `GET /api/v1/directory/contacts/{position_id}`: Single contact detail with channels, status, G.O. ref, and source evidence.
- `GET /api/v1/directory/departments`: List of 45 Secretariat departments with sanctioned strength and vacancies.
- `GET /api/v1/directory/departments/{id}`: Detailed department metadata.
- `GET /api/v1/directory/offices`: List of Directorates, Commissionerates, Collectorates.
- `GET /api/v1/directory/districts`: All 38 District Collectorates with incumbent Collectors and emergency phone/email.
- `GET /api/v1/directory/positions`: Civil post definitions and vacancy flags.
- `GET /api/v1/directory/hierarchy`: Recursive tree of department-specific administrative reporting nodes.
- `GET /api/v1/directory/categories`: High-level categories (State Leadership, Legislature, Department Admin, District Admin, Boards, RTI).
- `GET /api/v1/directory/sources/{id}`: Source metadata, content hash, and verification status.

## Administrative Endpoints
- `POST /api/v1/admin/directory/transfers`: Executes atomic officer transfer, supersedes previous assignment, activates destination assignment, and generates audit event.
- `POST /api/v1/admin/directory/change-requests`: Creates new draft change request.
- `GET /api/v1/admin/directory/change-requests`: Lists change requests with workflow steps.
- `POST /api/v1/admin/directory/change-requests/{id}/submit`: Transitions DRAFT -> PENDING_VERIFICATION.
- `POST /api/v1/admin/directory/change-requests/{id}/verify`: Transitions PENDING_VERIFICATION -> VERIFIED or NEEDS_CORRECTION / REJECTED.
- `POST /api/v1/admin/directory/change-requests/{id}/approve`: Transitions VERIFIED -> APPROVED.
- `POST /api/v1/admin/directory/change-requests/{id}/reject`: Transitions to REJECTED.
- `GET /api/v1/admin/directory/audit-events`: Immutable audit trail for compliance.
- `GET /api/v1/admin/directory/quality/metrics`: Real-time computed data quality metrics.
- `GET /api/v1/admin/directory/conflicts`: Detects dual assignments, missing contact points, and orphan posts.
