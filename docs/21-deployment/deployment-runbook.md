# Pilot Deployment Runbook

## 1. Prerequisites Checklist
- [ ] Staging tests pass 100% (82/82 backend tests, frontend build clean).
- [ ] Pilot environment variables configured in secret manager.
- [ ] Database backup snapshot completed.
- [ ] Nodal officers notified of scheduled deployment window.

## 2. Deployment Execution Sequence
1. **Pull and Deploy Containers**:
   ```bash
   docker compose pull
   docker compose up -d --remove-orphans
   ```
2. **Apply Database Migrations**:
   ```bash
   docker compose exec api alembic upgrade head
   ```
3. **Execute Ingestion Seed & Verification**:
   ```bash
   docker compose exec api python3 -m db.ingest
   ```
4. **Execute Post-Deployment Health Check**:
   ```bash
   curl -f http://localhost:8000/health
   curl -f http://localhost:3000/
   ```
