# SRE & Portal Operations Runbook

## 1. Routine Health & Telemetry Checks
- **Health Endpoint**: `GET /health` (expects HTTP 200 with database connectivity confirmation).
- **Quality Metrics**: `GET /api/v1/admin/ai/quality-metrics` (monitors grounded accuracy rate).
- **Directory Conflicts**: `GET /api/v1/admin/directory/conflicts` (scans for unassigned active positions or dual-cadre clashes).

## 2. Common Operational Procedures
- **Restarting Gateway Service**:
  ```bash
  systemctl restart tngov-gateway
  ```
- **Rebuilding Static Web Frontend**:
  ```bash
  cd web && npm run build
  ```
- **Executing Asynchronous Ingestion & Batch Indexing**:
  ```bash
  python3 -m db.ingest
  ```
