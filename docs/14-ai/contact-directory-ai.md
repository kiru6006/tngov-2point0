# Contact Directory AI: Deterministic Officeholder Resolution

## 1. Problem Statement: Vector Hallucination Risk
Vector embeddings over historical directories frequently retrieve retired, transferred, or deceased officials because of semantic proximity. In government administrative inquiries, serving stale contact data causes severe institutional harm and citizen misdirection.

## 2. Deterministic SQL Resolution Policy
All officeholder queries execute parameterized SQL lookups against normalized tables:

```sql
SELECT 
    p.title_en, p.title_ta, per.name_en, per.name_ta, 
    c.channel_type, c.channel_value, pa.assignment_type, pa.start_date
FROM positions p
JOIN position_assignments pa ON pa.position_id = p.id
JOIN persons per ON per.id = pa.person_id
LEFT JOIN official_contact_channels c ON c.assignment_id = pa.id
WHERE p.title_en ILIKE :designation
  AND pa.is_current = TRUE
  AND (pa.end_date IS NULL OR pa.end_date >= CURRENT_DATE);
```

## 3. Contact Data Minimization
Under Digital Personal Data Protection (DPDP) Act:
- Only official telephone, email, and room numbers are returned.
- Personal mobile numbers, personal home addresses, and private emergency contacts are scrubbed from citizen API payloads.
