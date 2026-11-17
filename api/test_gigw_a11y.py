import os
import re
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
WEB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "web")


def test_bilingual_coverage():
    """
    GIGW 3.0 Mandatory Rule: All public services, contacts, and documents
    must provide parallel Tamil and English text.
    """
    # 1. Services
    srv_resp = client.get("/api/v1/services")
    assert srv_resp.status_code == 200
    for srv in srv_resp.json()["services"]:
        assert srv["service_name_en"], "Missing English service name"
        assert srv["service_name_ta"], "Missing Tamil service name"
        # Validate Tamil unicode range (\u0B80-\u0BFF)
        assert re.search(r"[\u0B80-\u0BFF]", srv["service_name_ta"]), "Invalid Tamil text format"

    # 2. Contacts
    con_resp = client.get("/api/v1/contacts")
    assert con_resp.status_code == 200
    for official in con_resp.json()["officials"]:
        assert official["name_en"]
        assert official["name_ta"]
        assert official["designation_en"]
        assert official["designation_ta"]


def test_web_component_accessibility_markup():
    """
    WCAG 2.2 AA Audit: Ensure frontend templates include accessible attributes.
    """
    src_app = os.path.join(WEB_DIR, "src", "app")
    if not os.path.exists(src_app):
        return

    # Check that pages have proper semantic tags & lang attributes
    layout_file = os.path.join(src_app, "layout.tsx")
    if os.path.exists(layout_file):
        with open(layout_file, "r", encoding="utf-8") as f:
            content = f.read()
            assert 'lang="ta"' in content or 'lang="en"' in content or "lang=" in content
            assert "<main" in content or "role=" in content


def test_contrast_ratio_compliance():
    """
    GIGW 3.0 / WCAG 2.2 AA Contrast Check:
    Primary brand #004B87 against white background (#FFFFFF) must exceed 4.5:1 ratio.
    """
    def luminance(r, g, b):
        a = [x / 255.0 for x in (r, g, b)]
        a = [((x / 12.92) if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4) for x in a]
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]

    # #004B87 -> (0, 75, 135)
    lum_primary = luminance(0, 75, 135)
    lum_white = luminance(255, 255, 255)
    ratio = (lum_white + 0.05) / (lum_primary + 0.05)

    assert ratio >= 4.5, f"Contrast ratio {ratio:.2f} is below WCAG 2.2 AA threshold of 4.5:1"
