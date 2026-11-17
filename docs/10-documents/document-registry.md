# Government Orders & Document Registry Specification

## 1. Document Architecture
- Centralized index of Government Orders (G.O.s), Acts, Rules, Policy Notes, and Citizen Charters.
- Bilingual subjects (`subject_en`, `subject_ta`), issuing department, date, and verified download URLs.
- Machine-readability flags (`is_machine_readable: bool`).

## 2. Integrity & Hashing
- Documents indexed in RAG pipeline calculate SHA-256 content hashes to detect modifications or link rot.
- Superseded documents are labeled with `status = SUPERSEDED` and excluded from default public AI prompt context.
- Citations require original government source URLs.
