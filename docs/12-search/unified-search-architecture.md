# Unified Search Architecture

## 1. Search Aggregator
The unified search endpoint (`GET /api/v1/search`) acts as a federated retrieval aggregator across 7 government entities:
1. `SERVICE`: Citizen services and statutory certificates.
2. `SCHEME`: Government welfare benefits and schemes.
3. `DOCUMENT`: Government Orders, policy notes, acts.
4. `CONTACT`: Civil servants, Ministers, District Collectors.
5. `DEPARTMENT`: 45 Secretariat departments.
6. `DISTRICT`: 38 District Collectorates.
7. `OFFICE`: Directorates, Commissionerates, Taluk offices.

## 2. Tamil & English Dual Tokenization
- Queries are normalized and evaluated against both English and Tamil text fields.
- Autocomplete suggestions (`GET /api/v1/search/suggestions`) dynamically suggest top matching services, schemes, officials, and districts.
- Filter facets calculate entity counts per category.
