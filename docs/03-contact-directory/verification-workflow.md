# Verification & Approval Workflow Specification

## 1. Lifecycle State Machine
```
[DRAFT]
   | (Submit by Department Editor)
   v
[PENDING_VERIFICATION]
   | (Verified by Department Verifier)
   v
[VERIFIED]
   | (Approved by State Directory Administrator)
   v
[APPROVED] ---> Published in Public Directory

Exceptions:
-> [REJECTED] (Terminal, requires explanation)
-> [NEEDS_CORRECTION] (Returns to DRAFT with reviewer comments)
-> [SUPERSEDED] (Archived automatically upon subsequent transfer)
```

## 2. Mandatory Approval Rules
- Department editors cannot approve their own change requests (enforced via actor check).
- Department editors cannot modify positions belonging to other departments without delegated authority.
- All approval and dispute actions write immutable records into `audit_events`.
