# Tamil Nadu Government Digital Portal 2.0 - P0 Navigation Architecture & Low-Click Citizen UX

## 1. Overview & Problem Statement
Prior implementation relied excessively on isolated search inputs and deep secondary page hierarchies. Ordinary citizens, rural users, and low-literacy visitors suffered from:
- Unknown departmental ownership of citizen certificates and entitlements
- Buried Government Orders (G.O.s) and Gazettes
- Lack of visible, non-search service discovery
- Missing bilingual breadcrumbs and complex multi-click paths to return to services
- Reliance on icon-only navigation without Tamil/English labels

## 2. 4-Layer Header Architecture
Implemented across all pages via central reusable components:

### Layer A: Government Utility Bar (`GovernmentUtilityBar.tsx`)
- Official Tamil Nadu Emblem identity text: `தமிழ்நாடு அரசு | Government of Tamil Nadu`
- Screen reader skip link: `#main-content`
- Bilingual language switcher: `English` / `தமிழ்`
- High-contrast toggle: `Normal` / `High Contrast` (black background, `#ffff00` accents, WCAG 2.2 AAA 7:1)
- Direct shortcuts: `e-Sevai Centers` and `#sitemap`

### Layer B: Main Header (`GovernmentHeader.tsx`)
- State Seal (`tn-logo.svg`) and bilingual portal identity (`தமிழ்நாடு அரசு - இணைய தளம் 2.0`)
- Universal live search input with quick query suggestions
- Quick "All Services" (`/services`) discovery button
- Responsive mobile drawer hamburger toggle with visible text label `மெனு / Menu`

### Layer C: Primary Category Navigation with Accessible Mega Menus (`GovernmentHeader.tsx` + `AccessibleMegaMenu.tsx`)
- 7 Primary Sections:
  1. `HOME` (`/`)
  2. `CITIZEN SERVICES` (`/services`) - Mega Menu: Certificates, Revenue, Social Welfare, Transport
  3. `SCHEMES & BENEFITS` (`/schemes`) - Mega Menu: Women, Farmers, Students, Senior Citizens
  4. `GOVERNMENT CONTACTS` (`/directory`) - Mega Menu: Secretariat, Ministers, District Collectors, Police
  5. `DEPARTMENTS & DISTRICTS` (`/departments`) - Mega Menu: 38 District Collectorates, Line Depts
  6. `GOVERNMENT DOCUMENTS` (`/documents`) - Mega Menu: G.O.s, Gazettes, Forms, Budgets
  7. `GRIEVANCES & HELP` (`/grievance`) - Mega Menu: CM Helpline 1100, 108 Emergency, e-Sevai, Status
- Full keyboard support: `Escape` closes, `Tab` navigates items, ARIA expanded state, click outside dismissal.

### Layer D: Quick Access Navigation Bar (`QuickAccessBar.tsx`)
- 8 high-frequency citizen action shortcuts with bilingual text labels and SVG icons:
  1. `Community / Income Certificate` (`/services/rev-101`)
  2. `Patta / Chitta Transfer` (`/services/rev-102`)
  3. `Kalaignar Magalir Urimai` (`/schemes/welf-201`)
  4. `Pudhumai Penn Scheme` (`/schemes/edu-202`)
  5. `Search Govt Orders (G.O.)` (`/documents`)
  6. `Find District Collector` (`/directory?role=collector`)
  7. `CM Helpline 1100` (`tel:1100`)
  8. `Track Grievance Status` (`/grievance/track`)

## 3. Homepage 10-Section Architecture (`page.tsx`)
Rendered in strict mandated order:
1. **Section 1: Prominent Citizen Search** - Large search bar ("What government service do you need today? / இன்று உங்களுக்கு என்ன அரசு சேவை தேவை?") with quick tags.
2. **Section 2: Most Used Services** - 12 high-priority visible service cards with processing time, fee, department, and e-Sevai badges.
3. **Section 3: Browse All Services** - Full categorized grid (Revenue, Civil Supplies, Welfare, Transport, Rural) accessible without typing.
4. **Section 4: Find Government Contacts** - Direct search and quick directory links (Ministers, Collectors, Secretariat, Emergency).
5. **Section 5: Schemes for You** - Tabbed beneficiary discovery (Women, Farmers, Students, Senior Citizens, Differently Abled).
6. **Section 6: Government Orders & Documents** - Direct G.O. search bar, recent G.O. table, and document filters.
7. **Section 7: District Services** - Interactive 38-district selector with instant Collectorate phone, email, and portal links.
8. **Section 8: Grievances & Citizen Assistance** - Prominent cards for CM Helpline 1100, 108, 181, e-Sevai locator, and single-click grievance filing.
9. **Section 9: Announcements & Updates** - Important government notifications, recruitment notices, and press releases.
10. **Section 10: Footer Sitemap (`FooterSitemap.tsx`)** - 6 categorized link columns, GIGW 3.0 compliance note, NIC credit, and RTI links.

## 4. Low-Click Citizen Journeys Verified
- **Journey A (Community Certificate)**: Layer D Quick Access (`/services/rev-101`) or Section 2 Card -> **1 Click**
- **Journey B (Pudhumai Penn Scheme)**: Layer D Quick Access (`/schemes/edu-202`) or Section 5 Tab -> **1-2 Clicks**
- **Journey C (District Collector Phone)**: Section 7 District Selector -> Instant inline display (0 page reloads, 1 interaction)
- **Journey D (Recent G.O. Search)**: Layer D Quick Access (`/documents`) or Section 6 G.O. search -> **1 Click**
- **Journey E (CM Helpline 1100 / Grievance)**: Layer D Quick Access (`tel:1100`) or Section 8 direct action -> **1 Click**

## 5. Mobile Navigation & Accessibility
- **No Unlabeled Icons**: Every link and button contains visible Tamil & English typography.
- **Mobile Drawer**: Slide-over panel with category accordions, high-contrast toggle, emergency helplines, and clear tap targets ($\ge 44 \times 44\text{px}$).
- **Breadcrumbs**: Accessible breadcrumbs (`Breadcrumbs.tsx`) integrated on all deep service and scheme pages.
- **Standards**: Compliant with WCAG 2.2 AA / AAA (contrast $\ge 4.5:1$ in normal mode, $\ge 7:1$ in high contrast mode) and GIGW 3.0 guidelines.
