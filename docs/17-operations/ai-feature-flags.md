# AI Citizen Assistant Dynamic Feature Flags

| Flag Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `AI_CITIZEN_ASSISTANT_ENABLED` | Boolean | `true` | Master killswitch for conversational assistant; if false, hides chat widget and activates classical search. |
| `RAG_ZERO_GENERATION_STRICT` | Boolean | `true` | Enforces verbatim extraction for all statutory eligibility criteria. |
| `DETERMINISTIC_DIRECTORY_ROUTING`| Boolean | `true` | Bypasses LLM for current officeholder queries, executing deterministic SQL directly. |
| `CITIZEN_FEEDBACK_LOGGING` | Boolean | `true` | Captures positive/negative ratings to drive autonomous review queue. |
| `OCR_BACKGROUND_INGESTION` | Boolean | `true` | Controls asynchronous batch ingestion of scanned Government Orders. |
