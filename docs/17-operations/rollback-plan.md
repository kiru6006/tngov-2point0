# Deployment Rollback & Blue-Green Traffic Shifting

## 1. Zero-Downtime Deployment
Deployments leverage blue-green container environments behind NGINX / Cloudflare edge load balancers.

## 2. Automated Rollback Triggers
Automatic rollback initiates if post-deployment smoke tests detect:
- HTTP 5xx error rate $> 0.5\%$.
- Health check endpoint `/health` failing 2 consecutive polls.
- Database migration mismatch between application code and current schema revision.

## 3. Database Downgrade Procedure
Each Alembic migration includes an explicit `downgrade()` function:
```bash
alembic downgrade -1
```
For schema versions involving data loss, point-in-time snapshot restoration is triggered instead of in-place column drops.
