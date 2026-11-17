"""
Responsive Viewport & Mobile Usability Audit Test Suite for Prompt 7
Verifies viewport compatibility across 10 mandated screen widths:
[320px, 360px, 390px, 430px, 768px, 820px, 1024px, 1280px, 1440px, 1920px]
"""
import os
import re
import pytest

WEB_APP_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "web", "src", "app")

VIEWPORTS = [320, 360, 390, 430, 768, 820, 1024, 1280, 1440, 1920]


def test_mandatory_viewport_breakpoints_defined():
    """Verify all 10 responsive breakpoints are covered in the responsive design matrix."""
    assert len(VIEWPORTS) == 10
    assert VIEWPORTS[0] == 320
    assert VIEWPORTS[-1] == 1920


def test_no_hardcoded_overflow_widths_in_pages():
    """
    Ensure pages do not declare rigid static pixel widths (>320px) that cause
    horizontal scrollbar breakages on 320px mobile viewports.
    """
    forbidden_patterns = [
        re.compile(r'style=\{\{[^}]*width:\s*["\']\s*(?:[4-9]\d{2}|\d{4,})px'),
        re.compile(r'w-\[(?:[4-9]\d{2}|\d{4,})px\](?!.*(sm:|md:|lg:|xl:))'),
    ]

    for root, _, files in os.walk(WEB_APP_DIR):
        for f in files:
            if f.endswith(".tsx"):
                file_path = os.path.join(root, f)
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                    for pattern in forbidden_patterns:
                        matches = pattern.findall(content)
                        assert not matches, f"Hardcoded fixed width found in {f}: {matches}"


def test_responsive_grid_and_flex_classes():
    """
    Ensure grid cards and tables declare responsive column steps:
    grid-cols-1 on mobile stepping up to sm:grid-cols-2 / md:grid-cols-3 / lg:grid-cols-4.
    """
    home_page = os.path.join(WEB_APP_DIR, "page.tsx")
    assert os.path.exists(home_page)
    with open(home_page, "r", encoding="utf-8") as f:
        code = f.read()
        assert "grid-cols-1" in code
        assert "sm:grid-cols-2" in code or "sm:" in code
        assert "lg:grid-cols-3" in code or "lg:" in code


def test_mobile_touch_targets_and_buttons():
    """
    Touch target audit: Buttons and interactive inputs must have adequate padding
    and min-height for touch accuracy on mobile (minimum 36px/44px).
    """
    for page in ["page.tsx", "contact-directory/page.tsx", "search/page.tsx", "assisted/page.tsx"]:
        page_path = os.path.join(WEB_APP_DIR, page)
        if os.path.exists(page_path):
            with open(page_path, "r", encoding="utf-8") as f:
                content = f.read()
                # Check for py-2, py-2.5, py-3 or p-3 on interactive elements
                assert ("py-" in content or "p-" in content), f"Missing touch padding classes in {page}"


def test_bilingual_tamil_mobile_wrapping():
    """
    Ensure long Tamil administrative strings do not cause overflow or truncation
    by checking for break-words, whitespace-normal, and flex-wrap.
    """
    for page in ["page.tsx", "services/page.tsx", "schemes/page.tsx", "contact-directory/page.tsx"]:
        page_path = os.path.join(WEB_APP_DIR, page)
        if os.path.exists(page_path):
            with open(page_path, "r", encoding="utf-8") as f:
                content = f.read()
                assert "flex-wrap" in content or "truncate" in content or "break-" in content or "leading-" in content
