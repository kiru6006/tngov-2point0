# Multi-Tier Environment Strategy & Promotion Gates

## 1. Environment Tier Matrix
1. **Development (`dev`)**:
   - Purpose: Feature implementation and developer unit testing.
   - Data: Synthetic records only; zero production citizen data.
2. **Testing (`test` / `qa`)**:
   - Purpose: Automated CI/CD regression, vulnerability scanning, accessibility auditing.
   - Gate: 100% automated test pass rate required.
3. **Staging (`stage`)**:
   - Purpose: Deployment rehearsals, performance load testing, database rollback testing.
   - Configuration: Mirror of pilot/production infrastructure.
4. **Controlled Pilot (`pilot`)**:
   - Purpose: Supervised rollout to TNeGA nodal officers and 50 e-Sevai kiosks.
   - Access: Restricted to whitelisted IPs and registered test participants.
5. **Production (`prod`)**:
   - Purpose: Public statewide deployment across 45 departments and 38 districts.
   - Gate: Requires formal government sponsor signoff.
