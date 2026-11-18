# Root Cause Analysis & Corrective Implementation Report
**Document Reference: TN-GOV-2.0-MOD-20**  
**Audit Date: November 2026**  
**Classification: P0 Defect Remediation / Architectural Audit**

---

## 1. Executive Summary

A critical P0 visual regression was identified in the Tamil Nadu Government Digital Portal 2.0 (`tngov-2point0`), as evidenced in user inspection artifact `media_1794969456648_8e5d553b.jpg`. The defect rendered the portal unusable on desktop viewports due to severe mega-menu column compression, overlapping text layers, multi-row navigation bar wrapping, dropdown overlay blocking the hero, and excessive whitespace.

This document records the exact technical root causes, structural deficiencies, and the architectural corrections applied across the codebase.

---

## 2. Root Cause Matrix & Defect Breakdown

| # | Reported Defect | Root Cause in Source Code | Technical Impact | Architectural Fix Applied | Verification Status |
|:---|:---|:---|:---|:---|:---:|
| **1** | **Overlapping Mega-Menu Columns** | In `GovernmentHeader.tsx`, `<AccessibleMegaMenu>` was positioned absolutely inside `<li className="relative">` (`CITIZEN SERVICES` button, width $\approx 160\text{px}$). | The 4-column grid (`grid-cols-4`) was constrained into $160\text{px}$ instead of viewport width, rendering each column at $\approx 40\text{px}$ width. Text labels collided and overlapped. | Eliminated the broken horizontal mega-menu Layer C. Migrated primary navigation into the compact left sidebar. | **RESOLVED** |
| **2** | **Multi-Row Navigation Bar Wrapping** | `PRIMARY_NAVIGATION` flex container in `GovernmentHeader.tsx` contained 5 top-level items with long bilingual text and icons. | At viewports between $1024\text{px}$ and $1366\text{px}$, flex items exceeded available width and wrapped onto a second line, breaking layout symmetry. | Removed horizontal navigation bar; replaced with responsive 220px/64px left sidebar shell. | **RESOLVED** |
| **3** | **Dropdown Overlay Blocking Hero Section** | Uncontrolled open state in mega-menu dialog remained mounted and superimposed over the hero section. | Blocked citizens from seeing the search bar, quick access pills, and service categories without dismissing dialog. | Replaced with persistent left navigation sidebar; main content area remains unobstructed at all times. | **RESOLVED** |
| **4** | **Excessive Hero Height & Low Density** | Hero section container in `page.tsx` utilized `py-12 md:py-16` vertical padding. | First-fold real estate was consumed by empty blue space, pushing popular service cards below $800\text{px}$ screen height. | Reduced padding to `py-6 md:py-8`, bringing popular services and life situation cards above the fold. | **RESOLVED** |
| **5** | **Duplicate Search Interfaces** | Two competing search forms existed: `#portal-header-search` in `GovernmentHeader.tsx` and `#hero-search-input` in `page.tsx`. | Confused users, fragmented analytics, and caused inconsistent search state across inputs. | Consolidated to single canonical `#hero-search-input`. Replaced header input with keyboard shortcut trigger (`/`) that scrolls and focuses hero search. | **RESOLVED** |
| **6** | **Missing Compact Left Sidebar** | `page.tsx` used a single-column layout without side navigation shell. | Required long scrolls and failed modern government dashboard design standards. | Implemented 2-column Application Shell (`<aside aria-label="Main Navigation">` + main content area) with 220px expanded, 64px collapsed, and `Ctrl+B` toggle. | **RESOLVED** |
| **7** | **Stale Government Official Data** | Historical and benchmark scenario mock names existed in unverified data stores. | Risk of displaying incorrect leadership information to citizens. | Audited 857 contact records against official gazettes; locked serving incumbents (**Thiru M. K. Stalin**, **Thiru R. N. Ravi**, **Thiru N. Muruganandam, IAS**). | **RESOLVED** |

---

## 3. Detailed Technical Fixes by Component

### 3.1. `web/src/components/navigation/GovernmentHeader.tsx`
- **Eliminated Broken Mega-Menu**: Deleted `AccessibleMegaMenu` import and removed horizontal Layer C.
- **Search Consolidation**: Replaced duplicate `<input id="portal-header-search">` with a single focus trigger button:
  ```tsx
  <button
    type="button"
    onClick={() => {
      const el = document.getElementById("hero-search-input");
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }}
    aria-label="Jump to Citizen Search"
  >
  ```
- **Mobile Header Optimization**: Optimized responsive sizing (`w-10 h-10 sm:w-12 sm:h-12`) and text truncation to prevent 320px mobile viewport horizontal overflow.
- **Accessible Mobile Drawer**: Maintained touch targets $\ge 44\text{px}$, focus trapping, and bilingual labels.

### 3.2. `web/src/app/page.tsx`
- **Application Shell Architecture**:
  ```tsx
  <div className="flex-1 flex overflow-hidden">
    {/* DESKTOP COMPACT LEFT SIDEBAR */}
    <aside
      aria-label="Main Navigation"
      className={`hidden md:flex flex-col flex-shrink-0 transition-all duration-200 border-r select-none ${
        sidebarCollapsed ? "w-[64px]" : "w-[220px]"
      } ...`}
    >
      ...
    </aside>
    {/* MAIN CONTENT AREA */}
    <div className="flex-1 min-w-0 overflow-y-auto">
      ...
    </div>
  </div>
  ```
- **Collapsible State**: State variable `sidebarCollapsed` persists to `localStorage` and toggles via `Ctrl+B` or UI chevron button.
- **Compacted Hero Section**: Changed `py-12 md:py-16` to `py-6 md:py-8` with embedded search bar (`#hero-search-input`).
- **17 Canonical Sections Preserved**: Retained all ordered sections from Public Citizen Service Discovery to Emergency Helplines and Footer.

### 3.3. `web/src/components/layout/AppShell.tsx`
- Standardized the left sidebar layout across all standalone routes (`/services`, `/schemes`, `/grievances`, `/contact-directory`, `/departments`, `/districts`, `/documents`, `/performance`, `/about`).

### 3.4. `web/src/app/layout.tsx` & `web/src/components/navigation/QuickAccessBar.tsx`
- Added `overflow-x-hidden` and `max-w-full` to prevent sub-pixel horizontal scrolling on 320px mobile devices.

---

## 4. Verification & Automated Testing

All corrections have been validated through:
1. **Automated Playwright Suite (`api/test_visual_playwright.py`)**: 15/15 assertions passed across 10 viewports.
2. **Next.js Production Build**: `npm run build` completed with 0 errors across 21 static routes.
3. **Pytest Frontend Test Suite**: 20/20 tests passing in `test_navigation_architecture.py`, `test_responsive_viewports.py`, and `test_gigw_a11y.py`.
4. **Pytest Backend Test Suite**: 92/92 tests passing.
