# Document Intelligence & Summarization: Government Orders (G.O.)

## 1. Document Extraction Pipeline
- Ingests scanned and born-digital PDF Government Orders.
- OCR pipeline runs Tesseract with dual language packs (`eng+tam`).
- Post-OCR text correction fixes common optical recognition errors in Tamil ligature combinations (e.g. `கொ`, `கோ`, `கௌ`).

## 2. Objective Fact Extraction
For each G.O., Document Intelligence extracts structured attributes:
- Issuing Department and Secretariat Branch.
- G.O. Type (Ms., Rt., 2D).
- Reference Orders read in preamble.
- Financial Sanction Amounts and Head of Account.
- Operative Clauses and Effective Implementation Date.

## 3. Executive Summaries for Citizens
- Automatic 3-bullet summary generated in plain Tamil and English.
- Emphasizes citizen impact (e.g., fee waivers, application deadlines, eligibility relaxation).
