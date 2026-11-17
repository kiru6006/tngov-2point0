# Disaster Recovery, High Availability & Database Backup Policy

## 1. Backup Schedule & RPO / RTO
- **Continuous WAL Archiving**: Point-in-time recovery (PITR) up to the minute.
- **Daily Full Logical Snapshot**: Executed at 01:00 IST and replicated to secondary cloud region (Hyderabad / Chennai).
- **Recovery Point Objective (RPO)**: $< 5\text{ minutes}$.
- **Recovery Time Objective (RTO)**: $< 30\text{ minutes}$ for failover to hot standby.

## 2. Restore Verification Drills
Quarterly automated restore drills verify database integrity and replay Alembic migration history against fresh staging instances.
