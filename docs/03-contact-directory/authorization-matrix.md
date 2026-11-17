# Role-Based Access Control (RBAC) Matrix

| Action / Endpoint | PUBLIC_USER | DEPARTMENT_EDITOR | DEPARTMENT_VERIFIER | STATE_DIRECTORY_ADMIN | AUDITOR |
|---|---|---|---|---|---|
| View Public Directory (`/contacts`) | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW |
| View Hierarchy & Districts | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW |
| Submit Change Request (`/change-requests`) | DENY | ALLOW (Own Dept) | ALLOW (Own Dept) | ALLOW (All) | DENY |
| Verify Change Request (`/verify`) | DENY | DENY | ALLOW (Own Dept) | ALLOW (All) | DENY |
| Approve / Reject Request (`/approve`) | DENY | DENY | DENY | ALLOW | DENY |
| Execute Direct Transfer (`/transfers`)| DENY | DENY | DENY | ALLOW | DENY |
| View Audit Logs (`/audit-events`) | DENY | DENY | DENY | ALLOW | ALLOW |
| View Data Quality Dashboard (`/quality`)| DENY | ALLOW | ALLOW | ALLOW | ALLOW |
