# Retrieval Strategy & Precision Filtering

## 1. Intent Decomposition
Queries are classified into 4 operational intents:
1. `DIRECTORY_LOOKUP`: "Who is Collector of Salem?" -> Direct SQL on `positions`, `jurisdictions`, `position_assignments`.
2. `SCHEME_ELIGIBILITY`: "Can private college student apply for Pudhumai Penn?" -> Direct retrieval from `schemes.eligibility_criteria_en/ta`.
3. `SERVICE_WORKFLOW`: "How to apply for Legal Heir Certificate?" -> Direct retrieval from `services` catalog.
4. `POLICY_AND_ORDERS`: "What are wetland building rules in G.O. 128?" -> Hybrid RAG over `document_chunks`.

## 2. Superseded Document Exclusion
Any Government Order marked `SUPERSEDED` in `documents` or `source_documents` is hard-filtered at query time, preventing citizens from receiving outdated legal guidance.

## 3. Fallback Mechanism
If retrieval score falls below threshold ($\tau < 0.65$), the system returns standard helpline numbers (CM Helpline 1100, e-Sevai 1800-425-1333) and links to the relevant administrative department rather than speculating.
