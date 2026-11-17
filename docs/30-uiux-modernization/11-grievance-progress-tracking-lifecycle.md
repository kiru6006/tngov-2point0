# Grievance Progress Tracking Lifecycle
**Document Reference: TN-GOV-2.0-MOD-11**

---

### 1. Eight-Stage Institutional Lifecycle
Grievance processing across the CM Helpline (1100) adheres to an 8-stage state machine:

1. **`SUBMITTED`**: Petition logged via 1100 portal, mobile app, or e-Sevai center. Aadhaar e-KYC authenticated.
2. **`ACKNOWLEDGED`**: Formal SMS/WhatsApp acknowledgment dispatched with unique tracking reference (`GRV-TN-2026-XXXXX`).
3. **`ASSIGNED`**: Automated routing engine assigns petition to competent jurisdictional authority (District Collector / RDO / Tahsildar).
4. **`IN PROGRESS`**: Field inquiry, physical site inspection, or revenue record verification initiated.
5. **`AWAITING INFORMATION`**: Additional petitioner documentation or clarification requested with timer pause.
6. **`RESOLVED`**: Competent officer uploads Action Taken Report (ATR) and statutory disposal order.
7. **`CLOSED`**: Case finalized following positive citizen feedback via IVRS call or OTP confirmation.
8. **`REOPENED`**: Citizen appeals within 30 days if unsatisfied with redressal; elevated to District Collector Review Desk.

### 2. SLA Countdown & Breach Escalation
- Statutory SLA defaults: 15 working days for certificate/revenue issues, 7 days for municipal water/electricity faults.
- Automated escalations: Green (0-50% SLA elapsed), Amber (51-99% elapsed), Red (100% breached - flagged to District Collector).
