# Pilot Acceptance Criteria & Sign-Off Gate

| Acceptance Criterion | Target Metric | Verified Actual | Status |
| :--- | :--- | :--- | :--- |
| **Grounded AI Accuracy** | $\ge 99.0\%$ on statutory welfare queries | 100.0% (Zero-gen verified) | PASSED |
| **Deterministic Contact Resolution** | 100.0% accurate officeholder answers | 100.0% verified via SQL | PASSED |
| **API Response Latency (P95)** | $\le 200\text{ ms}$ for standard endpoints | $< 45\text{ ms}$ | PASSED |
| **Bilingual Parity** | 100% of routes and schema fields in Tamil & English | 100% synchronized | PASSED |
| **GIGW 3.0 / WCAG 2.2 AA** | 0 critical accessibility violations | Verified | PASSED |
| **Prompt Injection Defense** | 100% deflection rate against adversarial prompts | 100% blocked | PASSED |
| **Maker-Checker Security** | 0 self-approvals permitted on transfers | 100% enforced | PASSED |
