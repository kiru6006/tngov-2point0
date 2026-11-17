"""
Consolidated Benchmark (AP + Telangana + UP) Navigation Architecture Regression Test Suite
Validates the 4-layer header, 8-category canonical desktop menu, 14-category mega menu,
17-section homepage sequence, inline service action panel, and 18-attribute service detail page.
"""
import os
import re
import pytest

WEB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "web", "src")
NAV_FILE = os.path.join(WEB_DIR, "data", "navigation.ts")
PAGE_FILE = os.path.join(WEB_DIR, "app", "page.tsx")
SERVICE_DETAIL_FILE = os.path.join(WEB_DIR, "app", "services", "[id]", "page.tsx")
HEADER_FILE = os.path.join(WEB_DIR, "components", "navigation", "GovernmentHeader.tsx")
QUICK_BAR_FILE = os.path.join(WEB_DIR, "components", "navigation", "QuickAccessBar.tsx")
MEGA_MENU_FILE = os.path.join(WEB_DIR, "components", "navigation", "AccessibleMegaMenu.tsx")
UTILITY_BAR_FILE = os.path.join(WEB_DIR, "components", "navigation", "GovernmentUtilityBar.tsx")
SITEMAP_FILE = os.path.join(WEB_DIR, "components", "navigation", "FooterSitemap.tsx")


def test_navigation_data_model_and_configuration():
    """Verify centralized navigation configuration file exists with required exports."""
    assert os.path.exists(NAV_FILE), "navigation.ts configuration missing"
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert "QUICK_ACCESS_ITEMS" in code
        assert "PRIMARY_NAVIGATION" in code
        assert "MOST_USED_SERVICES" in code
        assert "INLINE_SERVICE_CATEGORIES" in code
        assert "LIFE_SITUATIONS_DATA" in code
        assert "CONSTITUTIONAL_PILLARS" in code
        assert "E_GOVERNANCE_PORTALS" in code
        assert "NOTICE_BOARD_DATA" in code
        assert "TN_DISTRICTS_LIST" in code
        assert "TOURISM_HIGHLIGHTS" in code
        assert "EMERGENCY_HELPLINES" in code


def test_four_layer_header_architecture():
    """Verify the 4 navigation layers are properly structured and imported in page.tsx."""
    assert os.path.exists(PAGE_FILE)
    with open(PAGE_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert "<GovernmentUtilityBar" in code
        assert "<GovernmentHeader" in code
        assert "<QuickAccessBar" in code


def test_eight_primary_categories_and_mega_menus():
    """
    Verify Primary Navigation contains all 8 canonical categories:
    HOME, CITIZEN SERVICES, SCHEMES & BENEFITS, GOVERNMENT, DEPARTMENTS & DISTRICTS,
    CONTACT DIRECTORY, GOVERNMENT DOCUMENTS, MORE.
    """
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        expected_categories = [
            "nav-home",
            "nav-services",
            "nav-schemes",
            "nav-government",
            "nav-dept-dist",
            "nav-contacts",
            "nav-documents",
            "nav-more",
        ]
        for cat in expected_categories:
            assert cat in content, f"Missing primary navigation category: {cat}"


def test_fourteen_inline_service_categories():
    """Verify all 14 statutory service categories exist in INLINE_SERVICE_CATEGORIES."""
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        assert "cat-cert" in content
        assert "cat-land" in content
        assert "cat-edu" in content
        assert "cat-emp" in content
        assert "cat-health" in content
        assert "cat-agri" in content
        assert "cat-util" in content
        assert "cat-trans" in content
        assert "cat-house" in content
        assert "cat-biz" in content
        assert "cat-welf" in content
        assert "cat-safety" in content
        assert "cat-grv" in content
        assert "cat-local" in content


def test_homepage_seventeen_sections_ordered_sequence():
    """
    Verify all 17 homepage sections are implemented in the exact mandated sequence:
    1. Utility Header
    2. Identity & Nav
    3. Citizen Search
    4. Popular Services
    5. Browse All Services by Category
    6. Service Action Panel (Inline Discovery - AP Pattern)
    7. Browse by Life Situation
    8. Government Contact Directory
    9. Government and Administration
    10. Departments and Districts
    11. Government Orders and Documents
    12. e-Governance Portal Directory
    13. Schemes and Benefits
    14. Announcements and Recruitment
    15. Tourism and Culture
    16. Emergency and Grievance Help
    17. Comprehensive Footer & Sitemap
    """
    with open(PAGE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

        pos_s1 = content.find("<header")
        pos_s3 = content.find('aria-label="Citizen Search Hero"')
        pos_s4 = content.find('aria-label="Popular Services"')
        pos_s5 = content.find('aria-label="Browse All Services by Category"')
        pos_s6 = content.find('aria-label="Service Action Panel"')
        pos_s7 = content.find('aria-label="Browse by Life Situation"')
        pos_s8 = content.find('aria-label="Government Contact Directory"')
        pos_s9 = content.find('aria-label="Government and Administration"')
        pos_s10 = content.find('aria-label="Departments and Districts"')
        pos_s11 = content.find('aria-label="Government Orders and Documents"')
        pos_s12 = content.find('aria-label="e-Governance Portal Directory"')
        pos_s13 = content.find('aria-label="Schemes and Benefits"')
        pos_s14 = content.find('aria-label="Announcements and Recruitment"')
        pos_s15 = content.find('aria-label="Tourism and Culture"')
        pos_s16 = content.find('aria-label="Emergency and Grievance Help"')
        pos_s17 = content.find("<FooterSitemap")

        assert pos_s1 != -1, "Section 1/2: Header missing"
        assert pos_s3 != -1, "Section 3: Citizen Search Hero missing"
        assert pos_s4 != -1, "Section 4: Popular Services missing"
        assert pos_s5 != -1, "Section 5: Browse All Services missing"
        assert pos_s6 != -1, "Section 6: Service Action Panel missing"
        assert pos_s7 != -1, "Section 7: Browse by Life Situation missing"
        assert pos_s8 != -1, "Section 8: Contact Directory missing"
        assert pos_s9 != -1, "Section 9: Government and Administration missing"
        assert pos_s10 != -1, "Section 10: Departments and Districts missing"
        assert pos_s11 != -1, "Section 11: Government Orders missing"
        assert pos_s12 != -1, "Section 12: e-Governance Portals missing"
        assert pos_s13 != -1, "Section 13: Schemes and Benefits missing"
        assert pos_s14 != -1, "Section 14: Announcements missing"
        assert pos_s15 != -1, "Section 15: Tourism and Culture missing"
        assert pos_s16 != -1, "Section 16: Emergency and Grievance Help missing"
        assert pos_s17 != -1, "Section 17: Footer Sitemap missing"

        # Verify strict order
        assert (
            pos_s1
            < pos_s3
            < pos_s4
            < pos_s5
            < pos_s6
            < pos_s7
            < pos_s8
            < pos_s9
            < pos_s10
            < pos_s11
            < pos_s12
            < pos_s13
            < pos_s14
            < pos_s15
            < pos_s16
            < pos_s17
        ), "Homepage sections are not in the exact mandated order"


def test_standard_service_detail_specification_fields():
    """Verify /services/[id] renders standard 18 attributes and action buttons."""
    assert os.path.exists(SERVICE_DETAIL_FILE)
    with open(SERVICE_DETAIL_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert "APPLY / OPEN OFFICIAL SERVICE" in code
        assert "Check Application Status" in code
        assert "View Required Documents" in code
        assert "Find Nearest e-Sevai Kiosk" in code
        assert "Get Help" in code
        assert "who_can_apply" in code
        assert "eligibility" in code
        assert "required_documents" in code
        assert "application_procedure" in code
        assert "last_verified_date" in code


def test_utility_bar_font_resizer_and_contrast():
    """Verify Utility bar has GIGW/UP font scaling (A-, A, A+) and high-contrast toggle."""
    assert os.path.exists(UTILITY_BAR_FILE)
    with open(UTILITY_BAR_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert "A-" in code and "A+" in code
        assert "highContrast" in code
        assert "Skip to main content" in code


def test_mobile_navigation_drawer_accessibility():
    """Verify mobile navigation has clear text labels and accessible drawer attributes."""
    assert os.path.exists(HEADER_FILE)
    with open(HEADER_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert 'aria-label="Mobile Navigation Drawer"' in code
        assert "aria-expanded=" in code
        assert "Menu" in code and "மெனு" in code


def test_low_click_citizen_journeys_reachability():
    """
    Verify low-click navigation paths exist from homepage:
    - Journey A: Income Certificate (1 action via quick access or most used)
    - Journey B: District Collector (1-2 actions via quick access or contacts)
    - Journey C: Government Order (1 action via quick access or docs)
    - Journey D: Raise Grievance (1 action via quick access or #emergency-help)
    - Journey E: Find Scheme (1 action via quick access or schemes)
    """
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        nav_code = f.read()
        assert "/services/certificates" in nav_code
        assert "/contact-directory?designation=Collector" in nav_code
        assert "/documents" in nav_code
        assert "1100" in nav_code
        assert "/schemes" in nav_code


def test_no_unlabeled_icons_in_navigation():
    """Rule: Never use icons without visible text labels for primary navigation."""
    with open(QUICK_BAR_FILE, "r", encoding="utf-8") as f:
        quick_code = f.read()
        assert "item.title_ta" in quick_code and "item.title_en" in quick_code

    with open(HEADER_FILE, "r", encoding="utf-8") as f:
        header_code = f.read()
        assert "nav.label_ta" in header_code and "nav.label_en" in header_code
