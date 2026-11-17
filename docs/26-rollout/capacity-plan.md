# Statewide Capacity & Infrastructure Sizing Plan

## 1. Workload Projections
- **Pilot Phase**: Peak 50 requests/sec, ~20,000 daily pageviews across 50 kiosks.
- **Statewide Production**: Peak 1,500 requests/sec, ~2,500,000 daily pageviews during major scheme or examination result announcements.

## 2. Infrastructure Sizing Matrix
| Tier | Pilot Configuration | Statewide Production Configuration |
| :--- | :--- | :--- |
| **Edge & CDN** | Cloudflare Standard Enterprise | Cloudflare High-Volume Government with DDoS Shielding |
| **Web Frontend** | 2 Nodes (2 vCPU, 4GB RAM each) | 6 Autoscaling Nodes (4 vCPU, 8GB RAM each) |
| **API Gateway** | 2 Nodes (2 vCPU, 4GB RAM each) | 8 Autoscaling Nodes (4 vCPU, 8GB RAM each) |
| **PostgreSQL Database** | Primary + Read Replica (4 vCPU, 16GB RAM) | Multi-AZ Primary + 3 Read Replicas (16 vCPU, 64GB RAM) |
| **Storage (G.O. PDFs)** | 100 GB NVMe Object Storage | 2 TB Replicated Geo-Redundant Object Storage |
