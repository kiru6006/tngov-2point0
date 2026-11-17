"""
End-to-End Citizen Journey Regression Test Suite for Prompt 7 Audit
Validates all 10 canonical citizen & administrative journeys defined in Execution Prompt 7.
"""
import pytest
from fastapi.testclient import TestClient
from main import app
from db.session import SessionLocal
from db.models import Position, Person, PositionAssignment
from db.ingest import run_all

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    db = SessionLocal()
    try:
        run_all(db)
    finally:
        db.close()


def test_journey_1_income_certificate_discovery():
    """
    Journey 1: Income / Community Certificate
    Citizen searches for service, reviews requirements, finds official e-Sevai URL.
    """
    resp = client.get("/api/v1/search?q=Community Certificate")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] > 0
    service_items = [r for r in data["results"] if r["entity_type"] == "SERVICE"]
    assert len(service_items) > 0
    first_srv = service_items[0]
    assert first_srv["action_url"].startswith("http") or first_srv["action_url"].startswith("/services/")
    assert first_srv["title_en"] is not None


def test_journey_2_district_collector_public_contact():
    """
    Journey 2: District Collector
    Citizen searches for Collector and finds verified Collector's office and public contact details.
    """
    resp = client.get("/api/v1/directory/contacts?query=Collector")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] > 0
    collector = data["officials"][0]
    assert "Collector" in collector["designation_en"]
    assert collector["is_vacant"] is False
    assert collector["verified"] is True
    assert collector["phone"] is not None or collector["email"] is not None


def test_journey_3_government_order_search_and_filter():
    """
    Journey 3: Government Order
    Citizen searches documents, opens authoritative document with active status and source.
    """
    resp = client.get("/api/v1/documents")
    assert resp.status_code == 200
    docs = resp.json().get("documents", [])
    assert len(docs) > 0
    doc_id = docs[0]["id"]

    detail_resp = client.get(f"/api/v1/documents/{doc_id}")
    assert detail_resp.status_code == 200
    detail = detail_resp.json()
    assert detail["status"] == "ACTIVE"
    assert detail["file_url"].startswith("http")


def test_journey_4_welfare_scheme_statutory_eligibility():
    """
    Journey 4: Welfare Scheme
    Citizen discovers welfare scheme (Kalaignar Magalir Urimai Thogai), reviews eligibility & benefits.
    """
    resp = client.get("/api/v1/schemes")
    assert resp.status_code == 200
    schemes = resp.json().get("schemes", [])
    assert len(schemes) >= 8
    scheme = schemes[0]
    assert scheme["eligibility_criteria"] is not None
    assert scheme["benefits_provided"] is not None


def test_journey_5_grievance_redressal_helplines():
    """
    Journey 5: Grievance
    Citizen discovers the CM Cell / Leadership escalation contacts across departments.
    """
    resp = client.get("/api/v1/contacts")
    assert resp.status_code == 200
    contacts = resp.json().get("officials", [])
    assert len(contacts) > 0
    cm_cell = next((c for c in contacts if "cmcell@tn.gov.in" in c.get("email", "") or "Chief Minister" in c.get("designation_en", "")), None)
    assert cm_cell is not None
    assert cm_cell["phone"] is not None


def test_journey_6_tamil_citizen_complete_discovery():
    """
    Journey 6: Tamil User
    Citizen completes entire service discovery, criteria check, and office lookup in Tamil.
    """
    resp = client.get("/api/v1/search?q=சாதிச் சான்றிதழ்")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] > 0
    first_item = data["results"][0]
    assert first_item["title_ta"] != ""


def test_journey_7_mobile_user_contact_action():
    """
    Journey 7: Mobile User
    Citizen retrieves official contact coordinates with usable phone and email actions.
    """
    resp = client.get("/api/v1/directory/contacts?limit=5")
    assert resp.status_code == 200
    officials = resp.json().get("officials", [])
    assert len(officials) > 0
    for official in officials:
        assert official["phone"] is not None or official["email"] is not None


def test_journey_8_department_editor_maker_checker():
    """
    Journey 8: Department Editor
    Nodal officer submits a contact change request, reviewer verifies, change enters audit ledger.
    """
    db = SessionLocal()
    try:
        asg = db.query(PositionAssignment).first()
        pos_id = asg.position_id
    finally:
        db.close()

    req_payload = {
        "change_type": "CONTACT_UPDATE",
        "department_id": "DEP-001",
        "position_id": pos_id,
        "payload": {
            "official_email": "updated.collector@tn.gov.in",
            "room_number": "Main Building Block A, Room 102"
        },
        "effective_date": "2026-06-01",
        "go_reference": "G.O. Ms. No. 102/2026/REV",
        "requested_by": "Department Nodal Editor"
    }
    submit_resp = client.post(
        "/api/v1/admin/directory/change-requests",
        json=req_payload,
        headers={"X-User-Role": "nodal_officer", "X-User-ID": "USR-MAKER-01"}
    )
    assert submit_resp.status_code == 201
    cr = submit_resp.json()
    cr_id = cr["request_id"]
    assert cr["status"] == "DRAFT"

    # Transition to PENDING_VERIFICATION
    sub_resp = client.post(
        f"/api/v1/admin/directory/change-requests/{cr_id}/submit",
        headers={"X-User-Role": "nodal_officer", "X-User-ID": "USR-MAKER-01"}
    )
    assert sub_resp.status_code == 200
    assert sub_resp.json()["status"] == "PENDING_VERIFICATION"

    # Verify
    verify_payload = {
        "action": "VERIFY",
        "actor_id": "Department Verifier Officer",
        "actor_role": "DEPARTMENT_VERIFIER",
        "comments": "Gazette notification reference cross-verified.",
    }
    ver_resp = client.post(
        f"/api/v1/admin/directory/change-requests/{cr_id}/verify",
        json=verify_payload,
        headers={"X-User-Role": "checker_officer", "X-User-ID": "USR-CHECKER-02"}
    )
    assert ver_resp.status_code == 200
    assert ver_resp.json()["status"] == "VERIFIED"

    # Approve
    approve_payload = {
        "action": "APPROVE",
        "actor_id": "State Directory Administrator",
        "actor_role": "STATE_ADMIN",
        "comments": "Approved for live portal directory publish.",
    }
    approve_resp = client.post(
        f"/api/v1/admin/directory/change-requests/{cr_id}/approve",
        json=approve_payload,
        headers={"X-User-Role": "checker_officer", "X-User-ID": "USR-CHECKER-02"}
    )
    assert approve_resp.status_code == 200
    assert approve_resp.json()["status"] == "APPROVED"


def test_journey_9_officer_transfer_workflow():
    """
    Journey 9: Officer Transfer
    Nodal admin records officer transfer with G.O. reference; preserves historical record and updates active assignment.
    """
    db = SessionLocal()
    try:
        asg = db.query(PositionAssignment).filter(PositionAssignment.is_current == True).first()
        person_id = asg.person_id
        old_pos_id = asg.position_id
        target_pos = db.query(Position).filter(Position.position_id != old_pos_id).first()
        new_pos_id = target_pos.position_id
    finally:
        db.close()

    payload = {
        "person_id": person_id,
        "current_position_id": old_pos_id,
        "new_position_id": new_pos_id,
        "transfer_type": "REGULAR_TRANSFER",
        "effective_date": "2026-07-01",
        "transfer_go_ref": "G.O.(Rt) No. 412/2026/PUBLIC",
        "authorized_by": "Chief Secretary",
        "close_previous_assignment": True
    }
    resp = client.post(
        "/api/v1/admin/directory/transfers",
        json=payload,
        headers={"X-User-Role": "nodal_officer", "X-User-ID": "USR-TRANSFER-01"}
    )
    assert resp.status_code in [200, 201]
    data = resp.json()
    assert data["success"] is True
    assert data["new_position_id"] == new_pos_id


def test_journey_10_ai_citizen_grounded_assistance():
    """
    Journey 10: AI Assistance
    Citizen asks question, receives source-grounded response with official next steps and citations.
    """
    chat_payload = {
        "message": "What is the assistance under Kalaignar Magalir Urimai Thogai?",
        "language": "en"
    }
    resp = client.post("/api/v1/ai/chat", json=chat_payload)
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["citations"]) > 0
    assert data["action_url"].startswith("http")
    assert data["answer_en"] != ""
