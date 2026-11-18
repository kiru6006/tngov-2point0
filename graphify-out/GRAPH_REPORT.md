# Graph Report - tngov-2point0  (2026-11-18)

## Corpus Check
- 269 files · ~374,003 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 5, .csv 3, .ini 1)

## Summary
- 792 nodes · 1719 edges · 38 communities (34 shown, 4 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Contact Directory API & Service Layer
- RAG & Document Indexing Engine
- RAG & Document Indexing Engine
- Citizen AI Assistant & Semantic Routing
- CI/CD Pipeline & GitHub Workflows (4)
- RAG & Document Indexing Engine
- RAG & Document Indexing Engine
- CI/CD Pipeline & GitHub Workflows (7)
- Frontend Build Tools & Styling Pipeline
- Citizen Services & Schemes Catalog Engine
- Pilot Acceptance & Load Testing Suite
- Portal Homepage & Navigation Layout
- CI/CD Pipeline & GitHub Workflows (12)
- Contact Directory Verification Tests
- End-to-End Citizen Journey Testing
- Subsystem Cluster 15
- Frontend UI Components & AppShell
- Citizen Services & Schemes Catalog Engine
- RAG & Document Indexing Engine
- Responsive Viewports QA Suite
- Contact Directory API & Service Layer
- RAG & Document Indexing Engine
- Security Audit & Vulnerability Testing
- Subsystem Cluster 23
- PostgreSQL Database & Migrations
- Frontend UI Components & AppShell
- Playwright Visual Regression Suite
- FastAPI Core Endpoint Test Suite
- Subsystem Cluster 28
- PostgreSQL Database & Migrations
- RAG & Document Indexing Engine
- PostgreSQL Database & Migrations
- Frontend UI Components & AppShell
- Subsystem Cluster 33
- Subsystem Cluster 34
- Subsystem Cluster 35
- Subsystem Cluster 36
- Subsystem Cluster 37

## God Nodes (most connected - your core abstractions)
1. `DirectoryService` - 46 edges
2. `PositionAssignment` - 32 edges
3. `Position` - 26 edges
4. `next` - 24 edges
5. `Document` - 23 edges
6. `run_all()` - 22 edges
7. `Person` - 22 edges
8. `lucide-react` - 22 edges
9. `Department` - 21 edges
10. `Jurisdiction` - 21 edges

## Surprising Connections (you probably didn't know these)
- `query_documents_ai()` --uses--> `Document`  [INFERRED]
  api/ai/router.py → api/db/models.py
- `summarize_document_ai()` --uses--> `Document`  [INFERRED]
  api/ai/router.py → api/db/models.py
- `ContactDirectoryAIService` --uses--> `Department`  [INFERRED]
  api/ai/service.py → api/db/models.py
- `ContactDirectoryAIService` --uses--> `Jurisdiction`  [INFERRED]
  api/ai/service.py → api/db/models.py
- `ContactDirectoryAIService` --uses--> `Person`  [INFERRED]
  api/ai/service.py → api/db/models.py

## Import Cycles
- None detected.

## Communities (38 total, 4 thin omitted)

### Community 0 - "Contact Directory API & Service Layer"
Cohesion: 0.10
Nodes (53): ingest_directory_master_data(), AdministrativeUnit, ApprovalWorkflow, AuditEvent, ChangeRequest, DepartmentNodalOfficer, DirectoryCategory, generate_uuid() (+45 more)

### Community 1 - "RAG & Document Indexing Engine"
Cohesion: 0.06
Nodes (11): DocumentChunk, MultilingualChunker, MultilingualEmbeddingService, BM25Okapi, HybridSearchService, OCRWorker, run_rag_indexing(), test_multilingual_chunker() (+3 more)

### Community 2 - "RAG & Document Indexing Engine"
Cohesion: 0.10
Nodes (27): citizen_ai_chat(), citizen_ai_search(), get_ai_quality_metrics(), get_ai_review_queue(), query_directory_ai(), query_documents_ai(), resolve_review_item(), submit_ai_feedback() (+19 more)

### Community 3 - "Citizen AI Assistant & Semantic Routing"
Cohesion: 0.05
Nodes (21): test_cs_01_find_income_certificate(), test_cs_02_find_verified_government_office(), test_cs_03_search_government_order(), test_cs_04_find_welfare_scheme(), test_cs_05_find_district_office(), test_cs_06_tamil_citizen_portal_usage(), test_cs_07_mobile_browser_contact_channels(), test_cs_08_ai_assistant_guidance_query() (+13 more)

### Community 4 - "CI/CD Pipeline & GitHub Workflows (4)"
Cohesion: 0.05
Nodes (42): environment, if, name, needs, runs-on, steps, environment, name (+34 more)

### Community 5 - "RAG & Document Indexing Engine"
Cohesion: 0.06
Nodes (13): ingest_documents(), ingest_schemes(), ingest_services(), run_all(), setup_db(), test_contact_directory_ai_deterministic_sql(), test_prompt_injection_guardrail_defense(), setup_test_db() (+5 more)

### Community 6 - "RAG & Document Indexing Engine"
Cohesion: 0.11
Nodes (20): add_security_headers(), approve_assignment(), AssignmentApproveRequest, AssignmentCreateRequest, AssignmentDisputeRequest, AssignmentResponse, create_assignment(), dispute_assignment() (+12 more)

### Community 7 - "CI/CD Pipeline & GitHub Workflows (7)"
Cohesion: 0.06
Nodes (33): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+25 more)

### Community 8 - "Frontend Build Tools & Styling Pipeline"
Cohesion: 0.09
Nodes (28): eslint, eslint-config-next, react-dom, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+20 more)

### Community 9 - "Citizen Services & Schemes Catalog Engine"
Cohesion: 0.21
Nodes (22): Document, Scheme, Service, get_department_overview(), get_district_overview(), get_document_detail(), get_scheme_detail(), get_search_suggestions() (+14 more)

### Community 10 - "Pilot Acceptance & Load Testing Suite"
Cohesion: 0.08
Nodes (13): PositionAssignment, test_journey_10_ai_citizen_grounded_assistance(), test_journey_1_income_certificate_discovery(), test_journey_2_district_collector_public_contact(), test_journey_3_government_order_search_and_filter(), test_journey_4_welfare_scheme_statutory_eligibility(), test_journey_5_grievance_redressal_helplines(), test_journey_6_tamil_citizen_complete_discovery() (+5 more)

### Community 11 - "Portal Homepage & Navigation Layout"
Cohesion: 0.12
Nodes (23): Home(), iconMap, FooterSitemap(), GovernmentUtilityBar(), UtilityBarProps, iconMap, QuickAccessBar(), QuickAccessBarProps (+15 more)

### Community 12 - "CI/CD Pipeline & GitHub Workflows (12)"
Cohesion: 0.10
Nodes (24): name, runs-on, steps, name, runs-on, steps, jobs, backend-qa (+16 more)

### Community 13 - "Contact Directory Verification Tests"
Cohesion: 0.16
Nodes (11): ingest_contacts(), Department, Jurisdiction, Person, Position, get_db(), list_positions(), list_contacts() (+3 more)

### Community 14 - "End-to-End Citizen Journey Testing"
Cohesion: 0.09
Nodes (10): test_eight_primary_categories_and_mega_menus(), test_four_layer_header_architecture(), test_fourteen_inline_service_categories(), test_homepage_seventeen_sections_ordered_sequence(), test_low_click_citizen_journeys_reachability(), test_mobile_navigation_drawer_accessibility(), test_navigation_data_model_and_configuration(), test_no_unlabeled_icons_in_navigation() (+2 more)

### Community 15 - "Subsystem Cluster 15"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 16 - "Frontend UI Components & AppShell"
Cohesion: 0.20
Nodes (12): react, AboutTamilNaduPage(), GrievanceRecord, GrievanceStage, GrievanceTrackingPage(), SAMPLE_GRIEVANCES, TimelineEvent, DEPARTMENT_METRICS (+4 more)

### Community 17 - "Citizen Services & Schemes Catalog Engine"
Cohesion: 0.17
Nodes (4): next, nextConfig, SearchContent(), UnifiedSearchPage()

### Community 18 - "RAG & Document Indexing Engine"
Cohesion: 0.19
Nodes (4): upgrade(), upgrade(), upgrade(), upgrade()

### Community 19 - "Responsive Viewports QA Suite"
Cohesion: 0.16
Nodes (5): test_bilingual_tamil_mobile_wrapping(), test_mandatory_viewport_breakpoints_defined(), test_mobile_touch_targets_and_buttons(), test_no_hardcoded_overflow_widths_in_pages(), test_responsive_grid_and_flex_classes()

### Community 20 - "Contact Directory API & Service Layer"
Cohesion: 0.17
Nodes (5): lucide-react, DepartmentInfo, DEPARTMENTS_DATA, DISTRICT_DETAILS, FooterProps

### Community 21 - "RAG & Document Indexing Engine"
Cohesion: 0.17
Nodes (5): test_assisted_access_operator_workflow(), test_bilingual_coverage(), test_contrast_ratio_compliance(), test_frontend_route_architecture(), test_web_component_accessibility_markup()

### Community 22 - "Security Audit & Vulnerability Testing"
Cohesion: 0.20
Nodes (4): test_dpdp_privacy_compliance(), test_owasp_security_headers(), test_sql_injection_resilience(), test_xss_and_input_validation()

### Community 23 - "Subsystem Cluster 23"
Cohesion: 0.20
Nodes (9): networks, tngov-edge, tngov-internal, name, services, internal, version, volumes (+1 more)

### Community 24 - "PostgreSQL Database & Migrations"
Cohesion: 0.20
Nodes (10): container_name, environment, image, networks, restart, volumes, POSTGRES_DB, POSTGRES_PASSWORD (+2 more)

### Community 25 - "Frontend UI Components & AppShell"
Cohesion: 0.24
Nodes (6): AccessibleMegaMenu(), MegaMenuProps, GovernmentHeader(), GovernmentHeaderProps, NavCategoryGroup, PRIMARY_NAVIGATION

### Community 27 - "FastAPI Core Endpoint Test Suite"
Cohesion: 0.32
Nodes (3): test_api_latency_sla(), test_hybrid_search_performance(), test_payload_size_budget()

### Community 28 - "Subsystem Cluster 28"
Cohesion: 0.25
Nodes (8): condition, api, web, container_name, depends_on, networks, ports, restart

### Community 29 - "PostgreSQL Database & Migrations"
Cohesion: 0.25
Nodes (8): container_name, depends_on, networks, ports, restart, condition, db, api

### Community 30 - "RAG & Document Indexing Engine"
Cohesion: 0.25
Nodes (8): environment, AI_CITIZEN_ASSISTANT_ENABLED, DATABASE_URL, DETERMINISTIC_DIRECTORY_ROUTING, NEXT_PUBLIC_API_BASE_URL, PORT, RAG_ZERO_GENERATION_STRICT, environment

### Community 31 - "PostgreSQL Database & Migrations"
Cohesion: 0.57
Nodes (7): healthcheck, healthcheck, interval, retries, test, timeout, healthcheck

### Community 32 - "Frontend UI Components & AppShell"
Cohesion: 0.38
Nodes (4): ServiceDetailPage(), BreadcrumbItem, Breadcrumbs(), BreadcrumbsProps

### Community 34 - "Subsystem Cluster 34"
Cohesion: 0.67
Nodes (4): build, context, dockerfile, build

### Community 35 - "Subsystem Cluster 35"
Cohesion: 0.50
Nodes (4): dependencies, lucide-react@^1.74.0, next@16.4.6, react@19.3.0

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PositionAssignment` connect `Pilot Acceptance & Load Testing Suite` to `Contact Directory API & Service Layer`, `RAG & Document Indexing Engine`, `Citizen AI Assistant & Semantic Routing`, `RAG & Document Indexing Engine`, `Citizen Services & Schemes Catalog Engine`, `Contact Directory Verification Tests`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 34 inferred relationships involving `DirectoryService` (e.g. with `get_contact_detail()` and `get_hierarchy()`) actually correct?**
  _`DirectoryService` has 34 INFERRED edges - model-reasoned connections that need verification._
- **Should `Contact Directory API & Service Layer` be split into smaller, more focused modules?**
  _Cohesion score 0.10287081339712918 - nodes in this community are weakly interconnected._
- **Why does `Document` connect `Citizen Services & Schemes Catalog Engine` to `Contact Directory API & Service Layer`, `RAG & Document Indexing Engine`, `RAG & Document Indexing Engine`, `Citizen AI Assistant & Semantic Routing`, `RAG & Document Indexing Engine`, `RAG & Document Indexing Engine`, `Contact Directory Verification Tests`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 18 inferred relationships involving `PositionAssignment` (e.g. with `ContactDirectoryAIService` and `list_positions()`) actually correct?**
  _`PositionAssignment` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Should `RAG & Document Indexing Engine` be split into smaller, more focused modules?**
  _Cohesion score 0.05879692446856626 - nodes in this community are weakly interconnected._
- **Why does `DirectoryService` connect `Contact Directory API & Service Layer` to `Pilot Acceptance & Load Testing Suite`, `Contact Directory Verification Tests`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._