# Autonomous Data Quality Agent & Conflict Scanner

## 1. Automated Detection Heuristics
The Data Quality Agent periodically scans the relational master tables to flag inconsistencies:
1. **Ghost Vacancies**: Positions marked active without an assigned official.
2. **Duplicate Assignments**: The same officer assigned to multiple conflicting full-time cadre positions without dual-charge order documentation.
3. **Invalid Contact Patterns**: Invalid government phone numbers (not matching STD codes) or non-government email domains (`@gmail.com` instead of `@tn.gov.in`).
4. **Superseded Reference Contradictions**: Active services referencing superseded Government Orders.

## 2. API Endpoints
- `GET /api/v1/admin/ai/review-queue`: Fetches open flagged anomalies.
- `POST /api/v1/admin/ai/review-queue/resolve`: Resolves an anomaly with maker-checker audit logging.
