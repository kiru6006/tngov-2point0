# Prompt Security, Guardrails & Jailbreak Defense

## 1. Threat Vectors Addressed
1. **System Prompt Extraction**: Probing for underlying instructions, API keys, or database credentials.
2. **Adversarial Roleplay / Jailbreaks**: Attempts to force the assistant into declaring false subsidies or political endorsements.
3. **Harmful / Unlawful Instruction Requests**: Generating malicious legal loopholes or evading statutory penalties.
4. **Data Poisoning & Indirect Injection**: Malicious text embedded in citizen-uploaded feedback or external PDFs.

## 2. Guardrail Enforcement Layer
- Pre-execution regex and semantic classifier checks every citizen prompt.
- Blocked queries immediately return:
  > *"This system is an official government information assistant. Requests attempting to alter system instructions, generate unverified legal claims, or bypass security boundaries cannot be processed."*
- Triggered events logged to `audit_events` with severity `WARNING` and client IP address.
