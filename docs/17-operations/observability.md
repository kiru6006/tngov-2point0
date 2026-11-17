# Observability, Telemetry & Logging Architecture

## 1. Metrics & Instrumentation
- **Application Performance**: Sub-200ms latency SLAs tracked across API endpoints via Prometheus/OpenTelemetry instrumentation.
- **AI Latency & Tokens**: Tracking prompt tokens, completion tokens, guardrail rejection counts, and search latency.
- **Error Tracking**: Categorized HTTP 4xx (client errors/invalid search) and 5xx (backend/upstream failures).

## 2. Structured JSON Logging
All application logs emit structured JSON format including:
- `timestamp`, `level`, `trace_id`, `endpoint`, `status_code`, `response_time_ms`, `user_agent`.
- Sensitive citizen input (e.g. tracking numbers, personal names) is sanitized before emission.
