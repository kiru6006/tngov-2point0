# Target Deployment Architecture: Tamil Nadu Digital Portal 2.0

## 1. Logical Architecture Topology

```
[ Citizen Browser / e-Sevai Kiosk ]
                │ (HTTPS / TLS 1.3)
                ▼
   [ Cloudflare Edge / WAF / CDN ]
   (DDoS Mitigation, Rate Limiting, Geo-Fencing)
                │
                ▼
      [ Reverse Proxy / Ingress ]
      (NGINX / Edge Load Balancer)
         │                     │
         ├─────────────────────┤
         ▼                     ▼
[ Next.js Web Tier ]   [ FastAPI API Gateway ]
(SSR & Static Engine)   (Asynchronous REST API)
(Port 3000)             (Port 8000)
                               │
                               ├───────────────────────┐
                               ▼                       ▼
                    [ PostgreSQL 16 DB ]     [ Hybrid RAG / AI Engine ]
                    (17 Master Tables)       (Dense + BM25 + Citations)
                    (Private VPC Subnet)
```

## 2. Network & Security Isolation
- **Edge Layer**: Terminates public SSL/TLS, blocks volumetric attacks, enforces OWASP core rule sets.
- **Application Tier**: Stateless containers running as non-root user `tngov` (UID 10001) and `nextjs` (UID 1001).
- **Data Tier**: Private VPC subnet without public IP address. Connects exclusively via authenticated internal network with TLS.
