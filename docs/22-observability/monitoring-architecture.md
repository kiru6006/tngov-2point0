# End-to-End Observability & Monitoring Architecture

## 1. Monitoring Layers
1. **Edge & Ingress (Cloudflare / NGINX)**:
   - Request counts, bandwidth, SSL handshake latency, WAF threat events.
2. **Frontend Telemetry (Next.js)**:
   - Core Web Vitals (LCP, CLS, INP), client-side uncaught exceptions.
3. **API & Service Telemetry (FastAPI)**:
   - HTTP request latency, status codes, active connection pools, endpoint throughput.
4. **Data & AI Quality Telemetry**:
   - Hallucination rate, citation coverage, review queue backlog, directory conflict count.
5. **Infrastructure Telemetry**:
   - Host CPU, memory usage, disk I/O, database IOPS and replication lag.
