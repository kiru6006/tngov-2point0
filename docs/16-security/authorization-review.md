# Authorization Matrix & Role-Based Access Control (RBAC)

| Role | Public Inquiries | Application Tracking | Propose Transfer | Approve Transfer | Ingest G.O. | Resolve AI Review Queue |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Citizen (Unauthenticated)** | Read-Only | Read-Only (by App ID) | ✗ | ✗ | ✗ | ✗ |
| **e-Sevai Kiosk Operator** | Read-Only | Assisted Read | ✗ | ✗ | ✗ | ✗ |
| **Department Nodal Maker** | Read-Only | Assisted Read | ✓ | ✗ | ✓ (Draft) | ✗ |
| **Department Nodal Checker** | Read-Only | Assisted Read | ✗ | ✓ | ✓ (Publish) | ✓ |
| **TNeGA Portal Superadmin** | Read-Only | Assisted Read | ✓ | ✓ | ✓ | ✓ |
