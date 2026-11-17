# Pilot Operational Risk Register

| Risk ID | Description | Severity | Likelihood | Mitigation Strategy | Owner | Status |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| **RSK-PLT-01** | Unauthorized public access to pilot environment | HIGH | LOW | Ingress restricted to static IP ranges of 50 pilot kiosks + secure auth token. | SRE Lead | CONTROLLED |
| **RSK-PLT-02** | Stale officer transfers published before gazette notification | MEDIUM | MEDIUM | Nodal officer required to upload gazette order reference before checker approve. | Gov Data Lead | CONTROLLED |
| **RSK-PLT-03** | AI provider latency spike causing timeout in chat widget | MEDIUM | LOW | 5-second circuit breaker with automatic fallback to deterministic catalog guidance. | AI Architect | CONTROLLED |
| **RSK-PLT-04** | Pilot database corruption or data loss | HIGH | LOW | Daily automated backup snapshots + continuous WAL archiving verified. | Database Lead | CONTROLLED |
