# Platform Metrics Catalogue

| Metric Key | Category | Unit | Target / SLA | Alert Threshold | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `http_requests_total` | Traffic | Count | N/A | Rate spike $> 500\%$ | Total incoming requests by route and code. |
| `http_request_duration_ms` | Latency | Milliseconds | P95 $\le 200\text{ ms}$ | P95 $> 500\text{ ms}$ | API response duration. |
| `http_error_rate_pct` | Reliability | Percentage | $< 0.1\%$ | $> 1.0\%$ | Ratio of 5xx responses. |
| `ai_citation_coverage_pct` | AI Quality | Percentage | $100\%$ | $< 95\%$ | Ratio of factual claims backed by official URI. |
| `ai_unsupported_answer_rate`| AI Quality | Percentage | $0.0\%$ | $> 2.0\%$ | Ratio of ungrounded responses. |
| `directory_stale_records` | Data Quality | Count | $0$ | $> 5$ | Contacts unverified for $> 90$ days. |
| `db_connection_pool_usage` | Database | Percentage | $< 70\%$ | $> 85\%$ | Active pool saturation. |
