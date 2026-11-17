# Emergency Rollback & Degradation Runbook

## 1. Trigger Conditions
- HTTP 5xx error rate exceeds 1% of total pilot traffic over 5 minutes.
- Unverified or inaccurate contact information detected in live directory.
- Database deadlock or migration failure during deployment.

## 2. Fast Rollback Procedure
1. **Activate AI Killswitch** (Instant UI revert to classic search):
   ```bash
   docker compose exec -e AI_CITIZEN_ASSISTANT_ENABLED=false api
   ```
2. **Revert Application Containers**:
   ```bash
   docker compose down
   docker compose -f docker-compose.previous.yml up -d
   ```
3. **Database Migration Downgrade**:
   ```bash
   docker compose exec api alembic downgrade -1
   ```
4. **Notify Incident Command**:
   - Send incident notification to TNeGA Lead SRE and Gov Project Sponsor.
