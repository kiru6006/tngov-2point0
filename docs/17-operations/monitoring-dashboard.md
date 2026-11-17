# Monitoring Dashboard & SRE Alerting Thresholds

## 1. Critical SRE Alert Thresholds
- **P95 Latency Spike**: Alert if API P95 latency exceeds 500ms for 3 consecutive 1-minute windows.
- **5xx Error Burst**: Alert if 5xx errors exceed 1% of total portal traffic within 5 minutes.
- **AI Hallucination Spike**: Alert if citizen negative feedback exceeds 5% of chat queries in an hour.
- **Review Queue Backlog**: Alert if pending AI review items exceed 50 unresolved entries.

## 2. Notification Channels
- Critical P0 alerts route directly to TNeGA SRE on-call engineers via SMS and institutional webhook.
- P1/P2 warnings dispatch to departmental Slack/Teams channels.
