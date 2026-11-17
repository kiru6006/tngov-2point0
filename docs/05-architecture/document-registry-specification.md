# Document Registry Specification & Search Architecture

## 1. Document Scope & Classification
The Government Document Registry catalogs all official publications:
1. **Government Orders (G.O.s)**: G.O. Ms. (Manuscript), G.O. Rt. (Routine)
2. **Statutory Instruments**: Acts, Rules, Amendments
3. **Executive Communications**: Circulars, Gazettes, Notifications
4. **Policy & Legislative Documents**: Departmental Policy Notes, Performance Budgets, Citizen Charters
5. **Public Media**: Press Releases (DIPR), Public Tender Notices, Official Application Forms

## 2. Multi-Faceted Document Search Engine
### Supported Search Filters
- **Department**: Multi-select across 45 Secretariat Departments.
- **Document Type**: G.O., Policy Note, Circular, Act/Rule, Tender, Form.
- **Year & Date Range**: Historical archive from 1950 to present.
- **Subject & Keywords**: Bilingual lexical search matching Tamil and English terms.
- **G.O. Reference**: Exact match for G.O. numbers (e.g. "G.O. Ms. No. 512").
- **Machine-Readability**: Filter for OCR-extracted vs. raw scanned archives.

## 3. Required Views
### 1. Document Search & Facet View (`/documents`)
- Sticky search bar with auto-suggest.
- Year chips for quick filtering (2026, 2025, 2024, Archive).
- Document cards with title, issuing department, date, file size, language tag, and download CTA.

### 2. Document Table View
- Detailed tabular view with columns: Doc ID, Type, Department, Subject, Issue Date, Format, Verified Source Link.
- Keyboard accessible with sorting and accessible CSV export.

### 3. Document Detail View (`/documents/[id]`)
- Embedded secure PDF viewer with download option.
- Full OCR-extracted bilingual text transcript.
- Semantic cross-links to related citizen services and responsible departments.
- Status badge: Active / Superseded / Historical.

### 4. Administrative Analytics View (Authorized Access)
- Metrics on monthly publication volume by department.
- OCR text extraction confidence distribution.
- Document staleness and broken citation audit dashboard.

## 4. Ingestion & RAG Architecture
```
[Scanned PDF Upload] 
         │
         ▼
[OCR Worker (Tesseract/PaddleOCR bilingual)] 
         │
         ▼
[Text Normalizer & Chunker (512 tokens / 64 overlap)]
         │
         ▼
[Multilingual Semantic Vectorizer (256-dim)]
         │
         ▼
[Hybrid Search Store (Postgres/pgvector + BM25)]
```
