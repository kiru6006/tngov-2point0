import pytest
from fastapi.testclient import TestClient
from main import app
from db.session import SessionLocal
from db.ingest import run_all

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    db = SessionLocal()
    try:
        run_all(db)
    finally:
        db.close()


def test_service_categories_and_schemes_api():
    # 1. Service categories
    resp_scat = client.get("/api/v1/service-categories")
    assert resp_scat.status_code == 200
    assert len(resp_scat.json()) >= 1

    # 2. Scheme list
    resp_sch = client.get("/api/v1/schemes")
    assert resp_sch.status_code == 200
    data = resp_sch.json()
    assert data["total"] >= 8
    first = data["schemes"][0]
    assert "scheme_id" in first
    assert "scheme_name_en" in first
    assert "scheme_name_ta" in first
    assert "eligibility_criteria" in first
    assert "benefits_provided" in first

    # 3. Scheme detail
    sch_id = first["scheme_id"]
    resp_detail = client.get(f"/api/v1/schemes/{sch_id}")
    assert resp_detail.status_code == 200
    assert resp_detail.json()["scheme_id"] == sch_id

    # 4. Scheme categories
    resp_cats = client.get("/api/v1/scheme-categories")
    assert resp_cats.status_code == 200
    assert len(resp_cats.json()) >= 3


def test_document_metadata_and_categories():
    # 1. Document categories
    resp_dcat = client.get("/api/v1/document-categories")
    assert resp_dcat.status_code == 200
    assert len(resp_dcat.json()) >= 1

    # 2. Document detail
    docs_resp = client.get("/api/v1/documents")
    assert docs_resp.status_code == 200
    first_doc_id = docs_resp.json()["documents"][0]["id"]
    resp_doc = client.get(f"/api/v1/documents/{first_doc_id}")
    assert resp_doc.status_code == 200
    assert resp_doc.json()["doc_id"] == first_doc_id
    assert resp_doc.json()["status"] == "ACTIVE"


def test_cross_module_overviews():
    db = SessionLocal()
    try:
        from db.models import Department, Jurisdiction
        dept = db.query(Department).first()
        jur = db.query(Jurisdiction).first()
        dept_id = dept.department_id
        jur_id = jur.jurisdiction_id
    finally:
        db.close()

    # 1. Department overview cross-linking services, schemes, documents and officials
    resp_dept = client.get(f"/api/v1/departments/{dept_id}/overview")
    assert resp_dept.status_code == 200
    dept_data = resp_dept.json()
    assert dept_data["department_id"] == dept_id
    assert "services_count" in dept_data
    assert "schemes_count" in dept_data
    assert "officials" in dept_data

    # 2. District overview
    resp_dist = client.get(f"/api/v1/districts/{jur_id}/overview")
    assert resp_dist.status_code == 200
    dist_data = resp_dist.json()
    assert dist_data["jurisdiction_id"] == jur_id
    assert "officers_count" in dist_data


def test_unified_search_across_entities():
    # 1. Search for a scheme (Magalir)
    resp_sch_search = client.get("/api/v1/search?q=Magalir")
    assert resp_sch_search.status_code == 200
    res1 = resp_sch_search.json()
    assert res1["total"] >= 1
    assert any(r["entity_type"] == "SCHEME" for r in res1["results"])
    assert "facets" in res1

    # 2. Search for a service (Certificate)
    resp_srv_search = client.get("/api/v1/search?q=Certificate")
    assert resp_srv_search.status_code == 200
    res2 = resp_srv_search.json()
    assert res2["total"] >= 1
    assert any(r["entity_type"] == "SERVICE" for r in res2["results"])

    # 3. Search for a district / city (Chennai)
    resp_dist_search = client.get("/api/v1/search?q=Chennai")
    assert resp_dist_search.status_code == 200
    res3 = resp_dist_search.json()
    assert res3["total"] >= 1

    # 4. Filter by entity_type
    resp_filtered = client.get("/api/v1/search?q=a&entity_type=SCHEME")
    assert resp_filtered.status_code == 200
    for r in resp_filtered.json()["results"]:
        assert r["entity_type"] == "SCHEME"

    # 5. Search suggestions
    resp_sugg = client.get("/api/v1/search/suggestions?q=Pudhumai")
    assert resp_sugg.status_code == 200
    assert len(resp_sugg.json()["suggestions"]) >= 1
