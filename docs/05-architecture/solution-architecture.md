# Solution Architecture: Decoupled Headless Stack

1. **Frontend (Next.js 19 App Router)**:
   - SSR/SSG for SEO and fast First Contentful Paint.
   - Deployed behind Edge CDN for low-latency statewide delivery.
   - TanStack Query for API caching.
2. **API Layer (Python FastAPI)**:
   - Asynchronous REST endpoints.
   - OpenAPI schemas for proxying TNeGA status and CM Helpline inquiries.
3. **Data Layer (PostgreSQL 16 & Headless CMS)**:
   - Strapi/Directus for Nodal Officer Maker-Checker workflows.
   - PostgreSQL for relational contact directory and service catalog.
   - S3-compatible object store for immutable G.O. PDF archive.
4. **Search & AI (Vector Store)**:
   - Milvus or pgvector storing OCR embeddings.
   - Multi-lingual embedding model for English/Tamil intent matching.
