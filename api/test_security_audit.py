from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_owasp_security_headers():
    """
    OWASP A05 & CERT-In Compliance: Mandatory HTTP security headers.
    """
    resp = client.get("/health")
    assert resp.status_code == 200
    headers = resp.headers

    assert headers.get("x-frame-options") == "DENY", "Missing X-Frame-Options: DENY"
    assert headers.get("x-content-type-options") == "nosniff", "Missing X-Content-Type-Options: nosniff"
    assert "max-age=" in headers.get("strict-transport-security", ""), "Missing HSTS header"
    assert "default-src" in headers.get("content-security-policy", ""), "Missing Content-Security-Policy"
    assert headers.get("referrer-policy") == "strict-origin-when-cross-origin"


def test_sql_injection_resilience():
    """
    OWASP A03: Injection attack simulation.
    ORM parameter binding must prevent SQL injection payloads from corrupting or leaking data.
    """
    sql_payloads = [
        "' OR '1'='1",
        "'; DROP TABLE services; --",
        "1 UNION SELECT null, null, null--",
        "' OR sleep(2)--",
    ]

    for payload in sql_payloads:
        # 1. Services search
        resp = client.get(f"/api/v1/services?category={payload}")
        assert resp.status_code == 200
        # Check that the table was not dropped
        check = client.get("/api/v1/services")
        assert check.status_code == 200
        assert check.json()["count"] >= 2

        # 2. Contacts search
        c_resp = client.get(f"/api/v1/contacts?query={payload}&department={payload}")
        assert c_resp.status_code == 200

        # 3. Service ID lookup
        srv_lookup = client.get(f"/api/v1/services/{payload}")
        assert srv_lookup.status_code == 404


def test_xss_and_input_validation():
    """
    OWASP A03 / CERT-In: Application ID format validation prevents XSS / Buffer Overflow.
    """
    invalid_ids = [
        "<script>alert(1)</script>",
        "TN-1234",  # Too short (< 8 chars)
        "';--",
        "",
    ]
    for bad_id in invalid_ids:
        resp = client.get(f"/api/v1/track/{bad_id}")
        assert resp.status_code in (400, 404)


def test_dpdp_privacy_compliance():
    """
    DPDP Act 2023 & CERT-In Compliance:
    Application tracking endpoint must NOT leak citizen Aadhaar or private home address.
    """
    resp = client.get("/api/v1/track/TNREV123456")
    assert resp.status_code == 200
    data = resp.json()
    assert "aadhaar" not in data
    assert "phone" not in data
    assert "resident_address" not in data
    assert "stage_number" in data
    assert "current_office" in data
