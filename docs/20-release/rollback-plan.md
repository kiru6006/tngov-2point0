# Production Rollback & Emergency Containment Plan

## 1. Automated Rollback Triggers
1. Application error rate exceeds 1% of total traffic over a 5-minute window.
2. Database connection pool exhaustion or deadlock.
3. Unverified official contact data published in live directory without checker approval.
4. AI Citizen Assistant hallucination rate exceeding 5% in review queue.

## 2. Rollback Execution Steps
- **Step 1 (AI Killswitch)**: Set `AI_CITIZEN_ASSISTANT_ENABLED=false` via environment variable to immediately revert frontend to classic search.
- **Step 2 (Traffic Shifting)**: Shift edge router DNS / load balancer target from Green (candidate) back to Blue (stable).
- **Step 3 (Database Rollback)**: If database schema was modified, execute `alembic downgrade -1` or restore from pre-deployment snapshot.
