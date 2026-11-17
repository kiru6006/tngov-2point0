# Contact Directory Testing Strategy

## 1. Test Pyramids & Suites
1. **Database & ORM Tests**:
   - Migration correctness via Alembic batch mode (`aa364356d90b`).
   - Foreign key integrity across 17 normalized entities.
   - Decoupled person-position referential constraints.
2. **Public API Tests (`test_directory.py`)**:
   - `test_directory_public_apis`: Pagination, search, detail, departments, districts, hierarchy, sources.
   - `test_security_rbac_and_data_minimization`: Verifies no PII leaks and bad requests return 400.
3. **Workflow Tests**:
   - `test_officer_transfer_management`: Atomic assignment closure, supersession, new assignment activation, and audit trail generation.
   - `test_change_request_workflow`: 4-stage Maker-Checker lifecycle.
   - `test_data_quality_metrics_and_conflicts`: Metric calculation and dual-primary conflict detection.
4. **GIGW 3.0 & WCAG 2.2 AA Tests (`test_gigw_a11y.py`)**:
   - Contrast ratio checks (≥ 4.5:1).
   - Tamil Unicode parity (\u0B80-\u0BFF).
   - Accessible markup and skip links.
5. **Performance & Security Tests**:
   - Sub-200ms latency SLAs (`test_performance.py`).
   - OWASP security headers & SQL injection immunity (`test_security_audit.py`).
