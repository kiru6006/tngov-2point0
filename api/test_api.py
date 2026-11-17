import pytest
from fastapi.testclient import TestClient

from main import app
from db.session import Base, engine, SessionLocal
from db.ingest import run_all

client = TestClient(app)


@pytest.fixture(autouse=True, scope="module")
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        run_all(db)
    finally:
        db.close()
    yield


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "Tamil Nadu" in data["portal"]


def test_list_services():
    response = client.get("/api/v1/services")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 2
    assert any(s["service_id"] == "TN-REV-SRV-0014" for s in data["services"])


def test_get_service():
    response = client.get("/api/v1/services/TN-REV-SRV-0014")
    assert response.status_code == 200
    data = response.json()
    assert data["service_name_en"] == "Community Certificate"
    assert data["statutory_sla_days"] == 15


def test_list_contacts():
    response = client.get("/api/v1/contacts")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 7
    # Verify relations: Chief Secretary
    cs = next((o for o in data["officials"] if o["id"] == "POS-001"), None)
    assert cs is not None
    assert "Muruganandam" in cs["name_en"]
    assert cs["cadre"] == "IAS"
    assert cs["verified"] is True


def test_contacts_filter():
    response = client.get("/api/v1/contacts?cadre=IAS")
    assert response.status_code == 200
    data = response.json()
    for o in data["officials"]:
        assert o["cadre"] == "IAS"


def test_list_documents():
    response = client.get("/api/v1/documents")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 1


def test_tracking():
    response = client.get("/api/v1/track/TNREV123456")
    assert response.status_code == 200
    data = response.json()
    assert data["application_id"] == "TNREV123456"
    assert data["stage_number"] == 3


def test_maker_checker_workflow():
    # 1. Maker drafts new assignment for POS-002
    create_payload = {
        "position_id": "POS-002",
        "person_id": "PER-003",
        "transfer_go_ref": "G.O. Ms. No. 999 Public (Spl.B)",
        "submitted_by": "Revenue Dept Nodal Maker",
        "auto_submit_for_review": True,
    }
    create_resp = client.post("/api/v1/admin/assignments", json=create_payload)
    assert create_resp.status_code == 201
    created_data = create_resp.json()
    assignment_id = created_data["assignment_id"]
    assert created_data["workflow_status"] == "PENDING_REVIEW"

    # 2. Duplicate submission conflict check
    dup_resp = client.post("/api/v1/admin/assignments", json=create_payload)
    assert dup_resp.status_code == 409

    # 3. List pending assignments
    list_resp = client.get("/api/v1/admin/assignments?workflow_status=PENDING_REVIEW")
    assert list_resp.status_code == 200
    pending_list = list_resp.json()["assignments"]
    assert any(a["assignment_id"] == assignment_id for a in pending_list)

    # 4. Approver signs off
    approve_resp = client.post(
        f"/api/v1/admin/assignments/{assignment_id}/approve",
        json={"approved_by": "Joint Secretary (Nodal Approver)"},
    )
    assert approve_resp.status_code == 200
    approved_data = approve_resp.json()
    assert approved_data["workflow_status"] == "APPROVED"
    assert approved_data["is_current"] is True

    # 5. Check public contact directory updated to new officer
    contacts_resp = client.get("/api/v1/contacts")
    pos_2 = next((o for o in contacts_resp.json()["officials"] if o["id"] == "POS-002"), None)
    assert pos_2 is not None
    assert pos_2["go_ref"] == "G.O. Ms. No. 999 Public (Spl.B)"

    # 6. Dispute test
    dispute_resp = client.post(
        f"/api/v1/admin/assignments/{assignment_id}/dispute",
        json={"disputed_by": "Audit Directorate", "reason": "Conflicting tenure dates"},
    )
    assert dispute_resp.status_code == 200
    assert dispute_resp.json()["workflow_status"] == "DISPUTED"
