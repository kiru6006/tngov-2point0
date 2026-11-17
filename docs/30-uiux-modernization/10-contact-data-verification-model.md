# Contact Data Verification & Integrity Model
**Document Reference: TN-GOV-2.0-MOD-10**

---

### 1. Verification Status Taxonomy
Every official contact record carries an immutable verification state:

```
                          +--------------------+
                          | PENDING_VERIF      |
                          +---------+----------+
                                    |
                    +---------------+---------------+
                    |                               |
          +---------v----------+          +---------v----------+
          | VERIFIED_CURRENT   |          | CONFLICTED         |
          +---------+----------+          +--------------------+
                    |
          +---------v----------+
          | VERIFIED_HIST      |
          +--------------------+
```

1. **`VERIFIED_CURRENT`**: Actively serving official verified against Tamil Nadu Government Gazette Extraordinary notifications.
2. **`NOT_PUBLICLY_AVAILABLE`**: Institutional post (e.g., PSU chairperson) currently vacant or pending official gazette notification.
3. **`VERIFIED_HISTORICAL`**: Prior incumbent who has transferred or superannuated, maintained for audit trails.
4. **`PENDING_VERIFICATION`**: Newly proposed appointment awaiting nodal officer review.
5. **`CONFLICTED`**: Overlapping assignments detected across concurrent posts.
6. **`STALE`**: Verification timestamp older than 90 days.

### 2. Maker-Checker Transfer Workflow
- **Maker Role**: Department Nodal Officer drafts assignment change linking position ID to person ID with Gazette G.O. reference.
- **Checker Role**: Joint Secretary (Public Department) or District DRO audits conflict check, approves assignment, and signs audit ledger.
