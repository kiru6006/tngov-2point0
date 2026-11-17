# Consolidated Defect Register & Resolution Tracking

| Defect ID | Priority | Description | Affected Component | Root Cause | Remediation | Status |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: |
| **DEF-01** | P1 | Missing `Suspense` boundary on `useSearchParams` in `/search` | `web/src/app/search/page.tsx` | Next.js 16 static optimization requirement | Wrapped `SearchContent` in `<Suspense>` | RESOLVED |
| **DEF-02** | P1 | Stray unclosed JSX bracket on homepage application tracker | `web/src/app/page.tsx` | Syntax regression during template merge | Added proper `<section>` opening tag | RESOLVED |
| **DEF-03** | P2 | Missing `List` type import in AI administrative router | `api/ai/router.py` | Missing typing import | Added `from typing import List` | RESOLVED |
| **DEF-04** | P2 | Attribute mismatch in search page document rendering | `web/src/app/search/page.tsx` | Referencing `.department` instead of `dept_en/ta` | Corrected bilingual attribute lookup | RESOLVED |
| **DEF-05** | P2 | Missing `Link` and `Award` imports in homepage | `web/src/app/page.tsx` | Unresolved identifier after Prompt 5 merge | Imported `Link` from next/link and `Award` | RESOLVED |
