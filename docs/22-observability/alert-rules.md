# Alert Rules & Escalation Thresholds

## 1. P0 Critical Alerts (SMS + Immediate Pager)
- **PortalDown**: Zero successful responses from `/health` for 2 minutes.
- **DatabaseConnectionFailure**: Database connection pool exhausted or failing authentication.
- **HighErrorRate**: HTTP 5xx responses exceed 2% of traffic over 3 minutes.
- **SecurityBreachDetected**: Multiple unauthorized admin route access attempts.

## 2. P1 High Priority Alerts (Slack / Email)
- **HighLatencyP95**: P95 latency exceeds 500ms for 5 consecutive minutes.
- **AIReviewQueueBacklog**: Unresolved review items exceed 25 records.
- **BackupJobFailed**: Scheduled database logical dump failed.
