# Transfer Management & Synchronization Workflow

## 1. Statutory Invariant: Decoupled Entity Model
Transfers are operational transitions, not schema modifications. When an official is transferred:
1. `positions` record remains permanent (`status: 'active'` or `'vacant'`).
2. Current `position_assignments` record has `is_current` set to `false` and `end_date` populated.
3. New `position_assignments` record created in `PENDING_REVIEW` status linking the incoming `person_id`.
4. Previous tenures remain archived in immutable audit records.

## 2. Directory Synchronization Pipeline
```
[Source Discovery (G.O. Rt / Ms)]
         │
         ▼
[Automated Extraction & Normalization]
         │
         ▼
[Conflict Detection Engine]
  ├── Overlapping active tenures for same officer?
  └── Multiple officers marked current on same position?
         │
    (Conflict Checked)
         ▼
[Nodal Review Queue (PENDING_REVIEW)]
         │
    (Joint Secretary Sign-off)
         ▼
[Approved & Published to Public Portal]
         │
         ▼
[Immutable Audit Log & API Cache Invalidation]
```

## 3. Roles and Permissions
- **Department Maker (Assistant Section Officer / Section Officer)**: Drafts transfer assignment, attaches Gazette / G.O. copy, enters effective date.
- **Department Approver (Joint Secretary / District DRO)**: Verifies G.O. validity against Public (Special.A / Special.B) notification, grants final approval.
- **System Auditor**: Read-only access to immutable audit log for administrative oversight.
