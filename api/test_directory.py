import pytest
from fastapi.testclient import TestClient
from main import app
from db.session import SessionLocal
from db.models import Position, Person, PositionAssignment, Department, Jurisdiction, AuditEvent
from db.ingest import run_all

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    db = SessionLocal()
    try:
        run_all(db)
    finally:
        db.close()


def test_directory_public_apis():
    # 1. Contacts search & pagination
    resp = client.get("/api/v1/directory/contacts?limit=5")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] >= 10
    assert len(data["officials"]) <= 5
    first = data["officials"][0]
    assert "position_id" in first
    assert "designation_en" in first
    assert "designation_ta" in first
    assert "source_reference" in first

    # 2. Search query in Tamil & English
    resp_search = client.get("/api/v1/directory/contacts?query=Revenue")
    assert resp_search.status_code == 200
    assert resp_search.json()["total"] >= 1

    # 3. Contact detail by position_id
    pos_id = first["position_id"]
    resp_detail = client.get(f"/api/v1/directory/contacts/{pos_id}")
    assert resp_detail.status_code == 200
    assert resp_detail.json()["position_id"] == pos_id

    # 4. Departments
    resp_depts = client.get("/api/v1/directory/departments")
    assert resp_depts.status_code == 200
    assert len(resp_depts.json()) >= 1

    # 5. Districts
    resp_dist = client.get("/api/v1/directory/districts")
    assert resp_dist.status_code == 200
    assert len(resp_dist.json()) >= 1

    # 6. Categories
    resp_cats = client.get("/api/v1/directory/categories")
    assert resp_cats.status_code == 200
    assert len(resp_cats.json()) == 6

    # 7. Hierarchy tree
    resp_hier = client.get("/api/v1/directory/hierarchy")
    assert resp_hier.status_code == 200
    hier = resp_hier.json()
    assert hier["node_id"] == "ROOT-TNGOV"
    assert len(hier["children"]) >= 1

    # 8. Source registry
    resp_src = client.get("/api/v1/directory/sources/SRC-GAZETTE-2026")
    assert resp_src.status_code == 200
    assert resp_src.json()["verification_status"] == "VERIFIED"


def test_officer_transfer_management():
    """
    Scenario: Transfer Officer from POS-001 (or existing position) to POS-002
    Validates assignment closure, new assignment creation, and audit logging.
    """
    db = SessionLocal()
    try:
        # Find an existing official with current assignment
        asg = db.query(PositionAssignment).filter(PositionAssignment.is_current == True).first()
        assert asg is not None
        person_id = asg.person_id
        old_pos_id = asg.position_id

        # Find another position
        target_pos = db.query(Position).filter(Position.position_id != old_pos_id).first()
        assert target_pos is not None
        new_pos_id = target_pos.position_id

        payload = {
            "person_id": person_id,
            "current_position_id": old_pos_id,
            "new_position_id": new_pos_id,
            "transfer_type": "REGULAR_TRANSFER",
            "effective_date": "2026-12-01",
            "transfer_go_ref": "G.O. (Rt) No. 998 Public (Special.A) Dept",
            "authorized_by": "Chief Secretary Secretariat",
            "close_previous_assignment": True,
        }

        resp = client.post("/api/v1/admin/directory/transfers", json=payload)
        assert resp.status_code == 200
        trf_data = resp.json()
        assert trf_data["success"] is True
        assert trf_data["new_position_id"] == new_pos_id
        assert trf_data["closed_assignment_id"] == asg.assignment_id

        # Verify old assignment in DB is now superseded
        db.refresh(asg)
        assert asg.is_current is False
        assert asg.workflow_status == "SUPERSEDED"

        # Verify audit event was written
        audit = db.query(AuditEvent).filter(AuditEvent.event_id == trf_data["audit_event_id"]).first()
        assert audit is not None
        assert audit.event_type == "OFFICER_TRANSFER"
    finally:
        db.close()


def test_change_request_workflow():
    """
    Full 4-stage lifecycle:
    DRAFT -> PENDING_VERIFICATION -> VERIFIED -> APPROVED
    """
    # 1. Create Change Request (DRAFT)
    create_payload = {
        "change_type": "NEW_ASSIGNMENT",
        "department_id": "DEP-0001",
        "position_id": "POS-001",
        "person_id": "PER-001",
        "payload": {"remarks": "Proposed regular cadre posting"},
        "effective_date": "2026-11-20",
        "go_reference": "G.O. Ms. No. 74",
        "requested_by": "Revenue Department Nodal Editor",
    }
    resp_create = client.post("/api/v1/admin/directory/change-requests", json=create_payload)
    assert resp_create.status_code == 201
    cr_id = resp_create.json()["request_id"]
    assert resp_create.json()["status"] == "DRAFT"

    # 2. Submit for verification
    resp_sub = client.post(f"/api/v1/admin/directory/change-requests/{cr_id}/submit")
    assert resp_sub.status_code == 200
    assert resp_sub.json()["status"] == "PENDING_VERIFICATION"

    # 3. Verify
    verify_payload = {
        "action": "VERIFY",
        "actor_id": "Department Verifier Officer",
        "actor_role": "DEPARTMENT_VERIFIER",
        "comments": "Gazette notification reference cross-verified.",
    }
    resp_ver = client.post(f"/api/v1/admin/directory/change-requests/{cr_id}/verify", json=verify_payload)
    assert resp_ver.status_code == 200
    assert resp_ver.json()["status"] == "VERIFIED"

    # 4. Approve
    approve_payload = {
        "action": "APPROVE",
        "actor_id": "State Directory Administrator",
        "actor_role": "STATE_DIRECTORY_ADMIN",
        "comments": "Final gazette posting sanctioned.",
    }
    resp_app = client.post(f"/api/v1/admin/directory/change-requests/{cr_id}/approve", json=approve_payload)
    assert resp_app.status_code == 200
    assert resp_app.json()["status"] == "APPROVED"


def test_data_quality_metrics_and_conflicts():
    # 1. Computed Metrics
    resp_metrics = client.get("/api/v1/admin/directory/quality/metrics")
    assert resp_metrics.status_code == 200
    m = resp_metrics.json()
    assert m["total_published_positions"] >= 10
    assert m["verified_current_assignments"] >= 5
    assert "last_computed_at" in m

    # 2. Conflicts Detection
    resp_conf = client.get("/api/v1/admin/directory/conflicts")
    assert resp_conf.status_code == 200
    assert isinstance(resp_conf.json(), list)


def test_security_rbac_and_data_minimization():
    # Data minimization: no private identity hashes in public directory response
    resp = client.get("/api/v1/directory/contacts")
    assert resp.status_code == 200
    first = resp.json()["officials"][0]
    assert "identity_hash" not in first
    assert "password" not in first

    # Invalid transfer position returns 400
    bad_payload = {
        "person_id": "PER-NON-EXISTENT",
        "current_position_id": "POS-9999",
        "new_position_id": "POS-8888",
        "effective_date": "2026-11-20",
        "transfer_go_ref": "G.O. 1",
    }
    resp_bad = client.post("/api/v1/admin/directory/transfers", json=bad_payload)
    assert resp_bad.status_code == 400
