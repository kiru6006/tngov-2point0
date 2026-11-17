# Compact Design System & Spacing Standard
**Document Reference: TN-GOV-2.0-MOD-05**

---

### 1. Rationale: Whitespace Elimination
Previous iterations suffered from excessive empty padding, sparse vertical grids, and oversized cards that forced citizens to scroll continuously. The 2.0.4 compact design system provides high information density while preserving legibility and WCAG 2.2 AAA visual hierarchy.

### 2. Spacing Scale & Tokens

| Element Context | Previous Spacing | Modernized Compact Token | Tailwind Utility Classes |
|---|---|---|---|
| **Outer Page Padding** | 32px to 48px | 16px to 20px | `p-4 md:p-5` |
| **Major Section Gap** | 48px to 64px | 16px | `space-y-4` / `gap-4` |
| **Grid Card Gap** | 20px to 24px | 10px to 12px | `gap-2.5` / `gap-3` |
| **Card Internal Padding** | 24px to 32px | 12px to 16px | `p-3 md:p-4` |
| **Table Header Padding** | 16px vertical | 8px to 10px | `py-2 px-3` |
| **Table Row Cell Padding**| 14px vertical | 8px to 10px | `py-2 px-3` |
| **Status Badge Padding** | 8px vertical | 2px to 4px | `py-0.5 px-2` |
| **Input & Button Height** | 48px to 56px | 36px to 40px | `py-1.5 px-3` / `py-2 px-4` |

### 3. Color Palette & Thematic Contrast
- **Primary Government Blue**: `#004B87` (Accessible 7.4:1 contrast ratio against white)
- **Deep Navy (Sidebar/Header)**: `#003366`
- **Success / Verified Green**: `#15803D` (Background: `#F0FDF4`)
- **Warning / In-Progress Amber**: `#B45309` (Background: `#FFFBEB`)
- **Danger / Overdue Red**: `#B91C1C` (Background: `#FEF2F2`)
- **Border Gray**: `#E2E8F0` (`slate-200`)
- **Background Slate**: `#F8FAFC` (`slate-50`)
