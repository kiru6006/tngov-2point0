# Responsible AI Risk Register & Safeguards

| Risk ID | Hazard | Severity | System Mitigation Control |
|---|---|---|---|
| RISK-AI-01 | Scheme Hallucination | Blocker | Zero-generation mode. Model extracts verbatim eligibility_rules from structured Service Catalog. Prohibited from synthesizing eligibility decisions. |
| RISK-AI-02 | Outdated G.O. Retrieval | Blocker | Vector DB filters status = ACTIVE. Superseded or repealed G.O.s excluded from search index. |
| RISK-AI-03 | Prompt Injection / Jailbreak | High | Input sanitized against regex guardrails. System prompt locks context to Tamil Nadu Government Official Assistant. Complex queries fallback to lexical search. |
| RISK-AI-04 | Translation Degradation | Medium | Automated Tamil translations require human sign-off (Maker-Checker) before index entry. |
| RISK-AI-05 | Data Sovereignty Breach | Blocker | Self-hosted bilingual models on State Data Centre (SDC) infrastructure. Zero PII transmission to public LLM endpoints. |
