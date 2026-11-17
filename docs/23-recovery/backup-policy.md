# Data Backup & Retention Policy

## 1. Backup Scope & Cadence
- **Continuous WAL Archiving**: Point-In-Time Recovery (PITR) up to the minute.
- **Daily Full Logical Snapshot**: `pg_dump` executed every day at 02:00 IST.
- **Retention Period**:
  - Daily backups: Retained for 30 days.
  - Weekly backups: Retained for 12 weeks.
  - Monthly regulatory snapshots: Retained for 7 years (CERT-In / CAG compliance).

## 2. Storage & Encryption
- Backup archives encrypted using AES-256 before upload.
- Replicated to a secondary geographical region (Chennai -> Hyderabad).
