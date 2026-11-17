# Contact Directory Verification & Maker-Checker Workflow

## 1. Roles & Permissions
- **Nodal Author (Department Maker)**: Drafts position assignments, updates telephone/address, uploads transfer G.O. references.
- **Nodal Approver (Joint Secretary / District DRO)**: Verifies G.O. validity, approves assignment transitions, publishes to public directory.
- **System Auditor**: Read-only access to immutable audit log of all changes.

## 2. Lifecycle States
1. DRAFT: New assignment created by Maker with linked transfer G.O.
2. PENDING_REVIEW: Automated conflict check passed (no overlapping active assignments for same person/position).
3. APPROVED: Approver digital sign-off. Cache invalidated, public API updated.
4. DISPUTED: Citizen feedback or conflicting department submission triggers audit flag.
