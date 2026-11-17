# Ingestion Pipeline Specification

## 1. Pipeline Stages
```
Official Source (Gazette / Portal)
       |
       v
Authorized Retrieval (HTTP client, TLS 1.3, rate-limited)
       |
       v
Raw Evidence Storage & Content Hash Calculation
       |
       v
Parsing (HTML / JSON / PDF OCR Worker)
       |
       v
Normalization (Dept codes, Cadre mapping, Phone/Email E.164 sanitization)
       |
       v
Entity Matching & Deduplication (Exact match -> Fuzzy AI candidate match)
       |
       v
Conflict Detection (Dual primary assignments, missing contacts)
       |
       v
Staging Quarantine (Maker-Checker Queue)
       |
       v
Human Verification & Dual-Approval
       |
       v
Published Public Directory (Search index cache update)
```

## 2. Duplicate & Conflict Rules
1. **Dual Primary Assignment**: Flagged as `CRITICAL` if two active officials hold primary assignment to the same position without an additional charge sanction.
2. **Missing Contacts**: Flagged as `HIGH` if official phone or email is unpopulated.
3. **Orphan Posts**: Flagged if position belongs to non-existent office or department.
