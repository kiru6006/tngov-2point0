# Government Portal Incident Response Runbook

## 1. Incident Severity Classifications
- **SEV-0 (Critical Emergency)**: Portal offline, public defacement, data breach, or widespread misleading welfare advice issued by AI.
- **SEV-1 (Major Degradation)**: AI assistant failing, search unavailable, or core directory searches returning 500 errors.
- **SEV-2 (Moderate Issue)**: Kiosk receipt generation delay or batch OCR backlog.
- **SEV-3 (Minor Problem)**: Non-blocking UI glitch or typo in departmental overview.

## 2. SEV-0 Immediate Containment Protocol
1. **Killswitch Activation**: Disable AI Citizen Assistant via feature flag `AI_CITIZEN_ASSISTANT_ENABLED=false` (reverts frontend immediately to deterministic search).
2. **Isolation**: Divert traffic to static read-only mirror if database is compromised.
3. **CERT-In Notification**: Mandatory notification dispatched within statutory 6 hours of confirmed cybersecurity breach.
