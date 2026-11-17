# Directory Search & Ranking Design

## 1. Search Query Capabilities
The search engine supports simultaneous Tamil and English queries across multiple dimensions:
- `query`: Matches person names, designations, department names, districts, and taluks.
- `department_id`: Filters by department UUID.
- `district`: Filters by district jurisdiction.
- `cadre`: Filters by civil service cadre (State Leadership, IAS, IPS, State Revenue, etc.).
- `status`: Active vs Vacant.
- `page` & `limit`: Server-side pagination with default 20, max 100 per page.

## 2. Tamil Unicode Matching
- Case-insensitive search on Latin text (`ilike %query%`).
- Exact & substring matching on Tamil Unicode range `\u0B80-\u0BFF`.
- Transliteration fallbacks handled via Hybrid Vector Search (`/api/v1/search/hybrid`) when exact string match returns zero results.
