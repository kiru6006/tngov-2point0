# Performance, SLA & Reliability Audit

## 1. Measured Benchmarks
- **API Response Latency**:
  - `/api/v1/services`: P95 $< 25\text{ ms}$ (SLA $\le 200\text{ ms}$).
  - `/api/v1/directory/contacts`: P95 $< 35\text{ ms}$.
  - `/api/v1/search`: P95 $< 45\text{ ms}$.
  - `/api/v1/ai/chat`: P95 $< 180\text{ ms}$.
- **Payload Size Budgets**:
  - Public directory response: $< 15\text{ KB}$ for 5-record pages (budget $\le 50\text{ KB}$).
  - Services catalog: $< 10\text{ KB}$ (budget $\le 50\text{ KB}$).
- **Frontend Core Web Vitals**:
  - Largest Contentful Paint (LCP): $< 1.2\text{ s}$ on static prerendered routes.
  - Cumulative Layout Shift (CLS): $0.00$.
  - Interaction to Next Paint (INP): $< 80\text{ ms}$.
