"""
UP Portal Modernization & P0 Navigation Architecture Regression Test Suite
Validates the 4-layer header, 9-category canonical navigation, accessible mega menus,
12-section homepage service visibility, mobile drawer, and low-click citizen journeys.
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
UTILITY_BAR_FILE = os.path.join(WEB_DIR, "components", "navigation", "GovernmentUtilityBar.tsx")
SITEMAP_FILE = os.path.join(WEB_DIR, "components", "navigation", "FooterSitemap.tsx")


def test_navigation_data_model_and_configuration():
    """Verify centralized navigation configuration file exists with required UP-modernized exports."""
    assert os.path.exists(NAV_FILE), "navigation.ts configuration missing"
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        code = f.read()
        assert "QUICK_ACCESS_ITEMS" in code
        assert "PRIMARY_NAVIGATION" in code
        assert "MOST_USED_SERVICES" in code
        assert "SERVICE_CATEGORIES_DATA" in code
        assert "GOVERNMENT_LEADERSHIP" in code
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
        # Layer A: GovernmentUtilityBar
        assert "<GovernmentUtilityBar" in code
        # Layer B & C: GovernmentHeader
        assert "<GovernmentHeader" in code
        # Layer D: QuickAccessBar
        assert "<QuickAccessBar" in code


def test_nine_primary_categories_and_mega_menus():
    """
    Verify Primary Navigation contains all 9 canonical categories adapted from UP reference:
    HOME, ABOUT TAMIL NADU, GOVERNMENT, CITIZEN SERVICES, SCHEMES & BENEFITS,
    GOVERNMENT DOCUMENTS, CONTACT DIRECTORY, DISTRICTS, MORE.
    """
    with open(NAV_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        expected_categories = [
            "nav-home",
            "nav-about",
            "nav-government",
            "nav-services",
            "nav-schemes",
            "nav-docs",
            "nav-contacts",
            "nav-districts",
            "nav-more",
        ]
        for cat in expected_categories:
            assert cat in content, f"Missing primary navigation category: {cat}"


def test_homepage_twelve_sections_ordered_sequence():
    """
    Verify all 12 homepage sections are implemented in the exact mandated sequence:
    1. Header and Navigation
    2. Citizen Search Hero ("All Government Services. One Place.")
    3. Most Used Citizen Services (8-12 cards)
    4. Browse Services by Category
    5. Government Leadership
    6. Government Contact Directory
    7. Key e-Governance Portals
    8. Government Orders and Notice Board
    9. District Explorer (38 districts selector)
    10. Tourism and Culture
    11. Emergency and Help (24x7 Helplines)
    12. Comprehensive Footer & Sitemap
    """
    with open(PAGE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

        # Find section positions
        pos_s1 = content.find("<header")
        pos_s2 = content.find('aria-label="Citizen Search Hero"')
        pos_s3 = content.find('aria-label="Most Used Services"')
        pos_s4 = content.find('aria-label="Browse Services by Category"')
        pos_s5 = content.find('aria-label="Government Leadership"')
        pos_s6 = content.find('aria-label="Government Contact Directory"')
        pos_s7 = content.find('aria-label="Key e-Governance Portals"')
        pos_s8 = content.find('aria-label="Government Orders and Notice Board"')
        pos_s9 = content.find('aria-label="District Explorer"')
        pos_s10 = content.find('aria-label="Tourism and Culture"')
        pos_s11 = content.find('aria-label="Emergency and Help"')
        pos_s12 = content.find("<FooterSitemap")

        assert pos_s1 != -1, "Section 1: Header & Nav missing"
        assert pos_s2 != -1, "Section 2: Hero Search missing"
        assert pos_s3 != -1, "Section 3: Most Used Services missing"
        assert pos_s4 != -1, "Section 4: Browse by Category missing"
        assert pos_s5 != -1, "Section 5: Government Leadership missing"
        assert pos_s6 != -1, "Section 6: Contact Directory missing"
        assert pos_s7 != -1, "Section 7: Key e-Governance Portals missing"
        assert pos_s8 != -1, "Section 8: Government Orders & Notice Board missing"
        assert pos_s9 != -1, "Section 9: District Explorer missing"
        assert pos_s10 != -1, "Section 10: Tourism & Culture missing"
        assert pos_s11 != -1, "Section 11: Emergency & Help missing"
        assert pos_s12 != -1, "Section 12: Footer Sitemap missing"

        # Verify strict order
        assert (
            pos_s1
            < pos_s2
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
        ), "Homepage sections are not in the exact mandated order"


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
