# Handover, Operations & Statewide Rollout Plan
**Document Reference: TN-GOV-2.0-MOD-18**

---

### 1. Release Milestones & Rollout Schedule
- **Phase 1: Pilot Launch (Week 1-2)**:
  - Deployed in 3 pilot districts (Chennai, Salem, Madurai).
  - Validated by CM Special Cell and District Collector Nodal Desks.
- **Phase 2: Administrative Onboarding (Week 3-4)**:
  - 38 District Collectorates onboarded to Official Workspace and Maker-Checker Queue.
  - Training sessions for 242 Heads of Departments.
- **Phase 3: Statewide Public Rollout (Week 5)**:
  - DNS migration of `www.tn.gov.in` to Digital Portal 2.0.
  - Launch of statewide awareness campaign for 1100 Grievance Tracking and e-Sevai Kiosks.

### 2. Operational Handover Checklist
1. **Database Maintenance**: SQLite / PostgreSQL replication and daily backup cron.
2. **Contact Directory Sync**: Automated weekly reconciliation against Tamil Nadu Government Gazette notifications.
3. **Security Audits**: Continuous OWASP dependency scanning and monthly penetration testing.
4. **Disaster Recovery**: Multi-region failover ready with recovery point objective (RPO) $< 15	ext{ minutes}$.
