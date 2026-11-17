# Human-in-the-Loop AI Review Workflow

## 1. Trigger Conditions
An item enters the Administrative Review Queue under the following triggers:
- Citizen marks an AI response as unhelpful or reports inaccurate information.
- RAG retrieval confidence score falls below confidence threshold ($\tau < 0.65$).
- Input guardrail detects potential adversarial attack or jailbreak attempt.
- Automated Data Quality Agent detects conflicting master records across departments.

## 2. Review Resolution States
- `PENDING`: Newly flagged item awaiting nodal officer investigation.
- `IN_REVIEW`: Assigned to departmental reviewer.
- `RESOLVED`: Corrective action taken (master data amended, verified prompt adjusted, or knowledge chunk updated).
- `DISMISSED`: Verified as false positive or spam submission.
