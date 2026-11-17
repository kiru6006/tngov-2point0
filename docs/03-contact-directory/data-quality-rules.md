# Directory Data Quality Rules & SLAs

## 1. Statutory Data Quality Rules
1. **Rule DQ-01 (Single Primary Assignment)**: No position may have more than 1 active assignment of type `PRIMARY`. Overlaps trigger `DUAL_PRIMARY_ASSIGNMENT` critical alerts.
2. **Rule DQ-02 (Contact Completeness)**: Every published active position must have at least one verified phone number and official `@tn.gov.in` or NIC email address.
3. **Rule DQ-03 (Statutory Authority Citation)**: Every transfer or appointment must cite an official Government Order (G.O.) number or Gazette reference.
4. **Rule DQ-04 (Freshness SLA)**: Position assignments older than 180 days without a verification re-attestation are flagged as `STALE`.
5. **Rule DQ-05 (Department Nodal Coverage)**: Every department must have at least one registered nodal editor and nodal verifier.

## 2. Calculated Metrics Formulae
- `Vacancy Rate (%) = (Vacant Positions / Sanctioned Positions) * 100`
- `Verification Rate (%) = (Dual-Approved Assignments / Active Assignments) * 100`
- `Contact Coverage (%) = (Assignments with Verified Phone & Email / Active Assignments) * 100`
