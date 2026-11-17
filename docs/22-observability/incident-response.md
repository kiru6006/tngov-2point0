# Incident Response & Escalation Protocol

```
[ Alert Triggered ]
         │
         ▼
[ Automated Triage ] ──► (Classify Severity: SEV-0 / SEV-1 / SEV-2)
         │
         ▼
[ SRE On-Call Assigned ]
         │
         ├──────────────────────────────────────────┐
         ▼                                          ▼
[ Technical Mitigation ]                 [ Government Escalation ]
(Rollback / Killswitch / Restart)         (Inform TNeGA Nodal Officer)
         │                                          │
         └──────────────────────────────────────────┘
         │
         ▼
[ Post-Incident Review (PIR) ]
(Root Cause Analysis & Prevention Plan within 24h)
```

## Mandatory Escalation Contacts
- **Technical Lead SRE**: On-call engineer rotation.
- **TNeGA Project Coordinator**: Operations escalation.
- **CERT-In Incident Liaison**: Mandatory report within 6 hours for confirmed cybersecurity events.
