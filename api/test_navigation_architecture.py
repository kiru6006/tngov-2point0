"""
P0 Navigation Architecture & Low-Click Citizen UX Regression Test Suite
Validates the 4-layer header, accessible desktop mega menus, mobile drawer,
10-section homepage service visibility, and 5 low-click citizen journeys.
"""
import os
import re
import pytest

WEB_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "web", "src")
NAV_FILE = os.path.join(WEB_DIR, "data", "navigation.ts")
PAGE_FILE = os.path.join(WEB_DIR, "app", "page.tsx")
HEADER_FILE = os.path.join(WEB_DIR, "components", "navigation", "GovernmentHeader.tsx")
QUICK_BAR_FILE = os.path.join(WEB_DIR, "components", "navigation", "QuickAccessBar.tsx")
MEGA_MENU_FILE = os.path.join(WEB_DIR, "components", "navigation", "AccessibleMegaMenu.tsx")
SITEMAP_FILE = os.path.join(WEB_DIR, "components", "navigation", "FooterSitemap.tsx")


def test_navigation_data_model_and_configuration():
    """Verify centralized navigation configuration file exists with required exports."""
    assert os.path.exists(NAV_FILE), "navigation.ts configuration missing"
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert "QUICK_ACCESS_ITEMS" in code
        assert "PRIMARY_NAVIGATION" in code
        assert "MOST_USED_SERVICES" in code
        assert "TN_DISTRICTS_LIST" in code


def test_four_layer_header_architecture():
    """Verify the 4 navigation layers are properly structured and imported in page.tsx."""
    assert os.path.exists(PAGE_FILE)
    with open(PAGE_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        # Layer A: GovernmentUtilityBar
        assert "<GovernmentUtilityBar" in code
        # Layer B & C: GovernmentHeader
        assert "<GovernmentHeader" in code
        # Layer D: QuickAccessBar
        assert "<QuickAccessBar" in code


def test_primary_category_navigation_and_mega_menus():
    """
    Verify Primary Category Navigation contains all required top-level categories:
    HOME, CITIZEN SERVICES, SCHEMES & BENEFITS, GOVERNMENT CONTACTS,
    DEPARTMENTS & DISTRICTS, GOVERNMENT DOCUMENTS, GRIEVANCES & HELP.
    """
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        expected_categories = [
            "nav-home",
            "nav-services",
            "nav-schemes",
            "nav-contacts",
            "nav-dept-dist",
            "nav-documents",
            "nav-grievance",
        ]
        for cat in expected_categories:
            assert cat in content, f"Missing primary navigation category: {cat}"


def test_homepage_ten_sections_ordered_sequence():
    """
    Verify all 10 homepage sections are implemented in the exact mandated sequence:
    1. Prominent Citizen Search
    2. Most Used Services (8-12 cards)
    3. Browse All Services
    4. Find Government Contacts
    5. Schemes for You
    6. Government Orders and Documents
    7. District Services
    8. Grievances and Assistance
    9. Announcements
    10. Footer Sitemap
    """
    with open(PAGE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

        # Find section positions
        pos_s1 = content.find("hero-search-heading")
        pos_s2 = content.find("most-used-heading")
        pos_s3 = content.find("browse-all-heading")
        pos_s4 = content.find("contacts-heading")
        pos_s5 = content.find("schemes-heading")
        pos_s6 = content.find("documents-heading")
        pos_s7 = content.find("district-heading")
        pos_s8 = content.find("grievance-heading")
        pos_s9 = content.find("announcements-heading")
        pos_s10 = content.find("<FooterSitemap")

        assert pos_s1 != -1, "Section 1: Hero Search missing"
        assert pos_s2 != -1, "Section 2: Most Used Services missing"
        assert pos_s3 != -1, "Section 3: Browse All Services missing"
        assert pos_s4 != -1, "Section 4: Find Government Contacts missing"
        assert pos_s5 != -1, "Section 5: Schemes for You missing"
        assert pos_s6 != -1, "Section 6: Government Orders missing"
        assert pos_s7 != -1, "Section 7: District Services missing"
        assert pos_s8 != -1, "Section 8: Grievances missing"
        assert pos_s9 != -1, "Section 9: Announcements missing"
        assert pos_s10 != -1, "Section 10: Footer Sitemap missing"

        # Verify strict order
        assert pos_s1 < pos_s2 < pos_s3 < pos_s4 < pos_s5 < pos_s6 < pos_s7 < pos_s8 < pos_s9 < pos_s10, \
            "Homepage sections are not in the mandated order"


def test_mobile_navigation_drawer_accessibility():
    """Verify mobile navigation has clear text labels and accessible drawer attributes."""
    assert os.path.exists(HEADER_FILE)
    with open(HEADER_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert 'aria-label="Mobile Navigation Drawer"' in code or "Mobile Navigation" in code
        assert 'aria-expanded=' in code
        assert "Menu" in code and "மெனு" in code


def test_low_click_citizen_journeys_reachability():
    """
    Verify low-click navigation paths exist from homepage:
    - Journey A: Income Certificate (1 action via quick access or most used)
    - Journey B: District Collector (1-2 actions via quick access or contacts)
    - Journey C: Government Order (1 action via quick access or docs)
    - Journey D: Raise Grievance (1 action via quick access or #grievances)
    - Journey E: Find Scheme (1 action via quick access or schemes)
    """
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        nav_code = f.read()

        # Income Certificate: directly linked in MOST_USED_SERVICES & PRIMARY_NAVIGATION
        assert "/services/certificates" in nav_code
        # District Collector: directly linked with designation filter
        assert "/contact-directory?designation=Collector" in nav_code
        # Government Orders: directly linked
        assert "/documents" in nav_code
        # Grievance / Helplines: directly linked
        assert "tel:1100" in nav_code or "#grievances" in nav_code
        # Schemes: directly linked
        assert "/schemes" in nav_code


def test_no_unlabeled_icons_in_navigation():
    """Rule: Never use icons without visible text labels for primary navigation."""
    with open(QUICK_BAR_FILE, "r", encoding="utf-8") as f:
        quick_code = f.read()
        assert "item.title_ta" in quick_code and "item.title_en" in quick_code

    with open(HEADER_FILE, "r", encoding="utf-8") as f:
        header_code = f.read()
        assert "nav.label_ta" in header_code and "nav.label_en" in header_code
