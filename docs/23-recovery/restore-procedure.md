# Database Restore & Verification Procedure

## 1. Point-in-Time Restore Steps
1. **Stop Application Gateway**:
   ```bash
   docker compose stop api
   ```
2. **Provision Target Recovery Database**:
   ```bash
   createdb -h localhost -U tngov_admin tngov_restore_verify
   ```
3. **Replay Logical Snapshot**:
   ```bash
   pg_restore -h localhost -U tngov_admin -d tngov_restore_verify latest_backup.dump
   ```
4. **Run Data Integrity Check**:
   - Query count on `positions`, `persons`, `position_assignments`, `audit_events`.
   - Replay Alembic migrations to confirm head status.
5. **Switch Traffic**:
   - Update `DATABASE_URL` environment variable and restart API container.
