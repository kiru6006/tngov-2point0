# AI Risk Register: Tamil Nadu Government Digital Portal 2.0

| Risk ID | Description | Severity | Likelihood | Mitigation Strategy | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-AI-01** | Vector hallucination of retired/transferred officials | HIGH | HIGH | Deterministic SQL routing on active `position_assignments` table. | MITIGATED |
| **RSK-AI-02** | Hallucination of welfare eligibility financial ceilings | CRITICAL | MEDIUM | Zero-generation catalog extraction directly from verified database columns. | MITIGATED |
| **RSK-AI-03** | Serving citizens superseded or repealed Government Orders | HIGH | MEDIUM | Mandatory query filter excluding `status = 'SUPERSEDED'`. | MITIGATED |
| **RSK-AI-04** | Prompt injection inducing false government commitments | HIGH | HIGH | Input guardrail filter and institutional refusal handler. | MITIGATED |
| **RSK-AI-05** | Leakage of private phone numbers or PII under DPDP | HIGH | LOW | Contact minimization filter stripping private phone numbers from responses. | MITIGATED |
| **RSK-AI-06** | Tamil translation inaccuracy altering legal stipulations | HIGH | MEDIUM | Bilingual pair curation with manual department nodal officer signoff. | MITIGATED |
