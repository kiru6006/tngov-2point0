# Contact Directory Operational Runbook

## 1. Routine Administrative Operations

### Officer Transfer Execution
1. Department editor or admin receives gazette notification (e.g. G.O. Ms. No. 100 Public).
2. Execute transfer via Admin API:
   ```bash
   curl -X POST http://localhost:8000/api/v1/admin/directory/transfers \
     -H "Content-Type: application/json" \
     -d '{
       "person_id": "PER-001",
       "current_position_id": "POS-001",
       "new_position_id": "POS-002",
       "effective_date": "2026-12-01",
       "transfer_go_ref": "G.O. Ms. No. 100 Public",
       "authorized_by": "Chief Secretary Secretariat"
     }'
   ```
3. Verify previous assignment is marked `SUPERSEDED` and new assignment is `APPROVED`.
4. Check data quality dashboard for zero conflicts.

### Batch Data Ingestion & Seeding
```bash
cd api
python3 -m db.ingest
```

### Running Test Verification Suite
```bash
cd api
python3 -m pytest -v
```

## 2. Incident & Conflict Remediation
- **Dual Assignment Conflict**: Open Maker-Checker Queue (`/contact-directory?tab=verification`), identify overlapping assignments, and flag dispute or terminate stale assignment by setting `is_current = False`.
- **Missing Contact Flag**: Nodal officer submits updated contact channel via `/api/v1/admin/directory/change-requests`.
