# Unified Contact Directory Integration
**Document Reference: TN-GOV-2.0-MOD-09**

---

### 1. Authoritative Reference Grounding
All official contact coordinates are directly synchronized from the official Tamil Nadu CM Dashboard Team Agent repository:
- **Local Path**: `/Users/apple/projects/vetri-tncm-aios/data/contacts/`
- **Live Deployment**: `https://kiru6006.github.io/vetri-tncm-team-agent/#directory`
- **Canonical Datasets**: `state_leadership.json`, `ministers.json`, `chief_secretary.json`, `cm_office.json`, `district_collectors.json`, `constitutional.json`, `secretariat.json`, `municipal.json`, `dro.json`, `mlas.json`, `rajya_sabha_mps.json`, `department_heads.json`, `undertakings.json`, `sources.json`.

### 2. Master Record Consolidation
A total of **857 authoritative records** are consolidated into `web/src/data/canonical_contacts.json` and `web/src/data/contacts.json`:
- State Leadership & Council of Ministers: 35
- Chief Secretary & CMO Secretariat: 7
- Constitutional Dignitaries & High Court: 4
- District Collectors (38 Districts): 38
- District Revenue Officers (DRO): 24
- Municipal Corporation Commissioners: 10
- Heads of Line Departments (HoD): 242
- State Undertakings & PSUs: 172
- Legislative Assembly Members (MLAs): 234
- Members of Parliament (Rajya Sabha): 18
