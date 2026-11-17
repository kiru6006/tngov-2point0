# Technical Administrator Operational Guide

## 1. System Administration & SRE Runbook
- **Container Lifecycle**:
  ```bash
  # Check status
  docker compose ps
  # Inspect logs
  docker compose logs -f api
  # Graceful restart
  docker compose restart api
  ```
- **Database Maintenance**:
  - Review active connections and WAL archiving status.
  - Run `alembic upgrade head` during scheduled maintenance windows.
- **Monitoring & Alerting Triage**:
  - Monitor P95 latency via `/health` and Prometheus metrics.
  - Inspect AI quality telemetry via `/api/v1/admin/ai/quality-metrics`.
