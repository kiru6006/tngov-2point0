# Contact Directory 2.0 Backend Architecture

## 1. Architectural Overview
The Government Contact Directory 2.0 is designed as an asynchronous Master Data Management (MDM) capability decoupling government positions from persons holding appointments.

```
                      +-----------------------------+
                      |   Citizen / Admin Clients   |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |   FastAPI REST API Gateway  |
                      | (Security Headers, CORS,    |
                      |  DPDP Act PII Sanitization) |
                      +--------------+--------------+
                                     |
         +---------------------------+---------------------------+
         |                           |                           |
         v                           v                           v
+------------------+       +-------------------+       +-------------------+
| Directory Router |       | Transfer Manager  |       | Verification MDM  |
| - Public Search  |       | - Closure / New   |       | - Maker-Checker   |
| - Category/Dist  |       | - Audit Events    |       | - Change Requests |
+--------+---------+       +---------+---------+       +---------+---------+
         |                           |                           |
         +---------------------------+---------------------------+
                                     |
                                     v
                      +-----------------------------+
                      | SQLAlchemy 2.x ORM & Alembic|
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      | PostgreSQL / SQLite Master  |
                      | (17 Normalized Entities)    |
                      +-----------------------------+
```

## 2. Invariant Decoupling Principles
- **Position Independence**: Positions (`Position`) exist permanently as sanctioned civil posts regardless of incumbent transfers or retirement.
- **Person Disassociation**: Personal demographics (`Person`) are maintained separately with official communication channels (`OfficialContactChannel`).
- **Assignment History**: Temporal records (`PositionAssignment`) track every appointment with effective dates, G.O. references, and Maker-Checker approval statuses.
- **Zero In-Place Overwrites**: Officer transfers archive existing assignments with status `SUPERSEDED` and mint new active assignments.
