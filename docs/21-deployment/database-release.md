# Database Release Management & Migration Safeguards

## 1. Migration Protocol & Principles
- All database modifications must be authored as versioned Alembic migration scripts.
- Migrations must support SQLite batch mode (`render_as_batch=True`) for automated testing and PostgreSQL for production.
- **Safeguards**:
  - Never execute destructive `DROP TABLE` or `DROP COLUMN` in initial release migrations.
  - Historical position assignments and transfer orders are append-only; active assignments are marked `is_current = FALSE` rather than deleted.
  - Foreign key constraints prevent orphan records in contact and workflow tables.

## 2. Pre-Deployment Database Validation
1. Verify pending migrations via `alembic current` and `alembic heads`.
2. Take a point-in-time logical snapshot prior to applying migrations.
3. Apply migration: `alembic upgrade head`.
4. Validate schema integrity with automated health check.
