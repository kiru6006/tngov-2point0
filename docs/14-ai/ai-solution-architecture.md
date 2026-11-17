# AI Solution Architecture: Tamil Nadu Government Digital Portal 2.0

## 1. System Topology & Dual-Engine Pipeline

The AI Citizen Assistant for TN Portal 2.0 adopts a hybrid deterministic-probabilistic architecture:

```
[ Citizen Query (Tamil / English) ]
               │
               ▼
   [ Input Guardrail & Sanitizer ]
   (Injection Check, PII Masking, Profanity Filter)
               │
               ▼
     [ Intent Router / Classifier ]
         │                    │
         ├────────────────────┼─────────────────────┐
         ▼                    ▼                     ▼
[ Contact Directory ]   [ Scheme / Service ]   [ Policy / G.O. Query ]
         │                    │                     │
         ▼                    ▼                     ▼
[ Deterministic SQL ]  [ Zero-Gen Catalog ]   [ Hybrid RAG Engine ]
 (Position/Office)      (Statutory Rules)      (Dense + BM25 + Reciprocal Rank)
         │                    │                     │
         └────────────────────┼─────────────────────┘
                              ▼
                [ Grounded Context Assembler ]
                              ▼
                [ Output Citation Guardrail ]
                              ▼
                [ Structured Bilingual Response ]
```

## 2. Guardrail Subsystems

1. **Deterministic Contact Routing**:
   - Queries matching administrative offices (Collector, Tahsildar, Minister, Secretary) bypass LLM generation entirely.
   - Evaluates active assignments where `end_date IS NULL` or `end_date >= CURRENT_DATE`.
   - Prevents stale vector hallucination of transferred/retired officials.

2. **Zero-Generation Statutory Rules**:
   - For welfare eligibility (Kalaignar Magalir Urimai Thogai, Moovalur Ramamirtham, Pudhumai Penn, Chief Minister's Comprehensive Health Insurance), responses are extracted verbatim from approved scheme metadata.
   - Guardrail verification strictly forbids numeric threshold hallucination (e.g., annual income limit).

3. **Prompt Injection & Adversarial Jailbreak Defense**:
   - Scans against system prompt override patterns (`ignore previous instructions`, `bypass rules`, `sudo mode`).
   - If triggered, returns standardized institutional refusal with zero internal prompt leakage.
