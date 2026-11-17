# Left Navigation Architecture & Sidebar Specification
**Document Reference: TN-GOV-2.0-MOD-03**

---

### 1. Structural Overview
The primary navigation of the portal resides in a persistent, accessible left sidebar (`AppShell.tsx`). This eliminates bloated multi-tier headers and provides rapid single-click access to all canonical modules.

### 2. Dimension & State Specifications
- **Expanded Width**: 224px (`w-[224px]`) - Displays icons, full text labels (bilingual), and badge counters.
- **Collapsed Width**: 64px (`w-[64px]`) - Displays centered icons with native HTML `title` tooltips.
- **Toggle Mechanism**: 
  - Header toggle icon button.
  - Global keyboard shortcut: `Ctrl + B` or `Cmd + B`.
  - State persisted across sessions in `localStorage` (`tngov_sidebar_collapsed`).
- **Mobile Mode (<1024px)**:
  - Sidebar hidden by default.
  - Slide-out navigation drawer with modal focus trap and semi-transparent backdrop (`bg-slate-900/50`).
  - Dismissible via backdrop tap, top Close button, or `Escape` key.

### 3. Route Mapping by Workspace

#### Public Citizen Navigation:
1. **Home** (`/`) - Icon: `Home`
2. **Citizen Services** (`/services`) - Icon: `FileText` (Badge: 64+)
3. **Schemes & Benefits** (`/schemes`) - Icon: `Award`
4. **Grievance Tracking** (`/grievances`) - Icon: `ShieldAlert` (Badge: Track)
5. **Contact Directory** (`/contact-directory`) - Icon: `Users` (Badge: 845+)
6. **Departments** (`/departments`) - Icon: `Building2`
7. **Districts** (`/districts`) - Icon: `MapPin` (Badge: 38)
8. **Government Orders** (`/documents`) - Icon: `FileCheck2`
9. **Govt Performance** (`/performance`) - Icon: `BarChart3`
10. **About Tamil Nadu** (`/about`) - Icon: `Landmark`
11. **Emergency & Help** (`/#emergency-help`) - Icon: `PhoneCall`

#### Official Workspace Navigation:
1. **Overview Dashboard** (`/`) - Icon: `LayoutDashboard`
2. **Grievance Queue** (`/grievances`) - Icon: `ShieldAlert` (Badge: Active)
3. **Department KPIs** (`/performance`) - Icon: `BarChart3`
4. **Service Catalogs** (`/services`) - Icon: `FileText`
5. **Scheme Sanctions** (`/schemes`) - Icon: `Award`
6. **Officer Directory** (`/contact-directory`) - Icon: `Users`
7. **Line Departments** (`/departments`) - Icon: `Building2`
8. **Gazette & G.O. Repository** (`/documents`) - Icon: `FileCheck2`
9. **Maker-Checker Queue** (`/contact-directory#approval-queue`) - Icon: `CheckCircle` (Badge: Audit)
10. **Administrative Manual** (`/about`) - Icon: `Landmark`
