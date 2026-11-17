# Tamil Nadu Government Design System v1 (GIGW 3.0 / WCAG 2.2 AA)

## 1. Color Tokens & Contrast Ratios
- **Primary Brand**: TN Blue `#004B87` (Contrast ratio against `#FFFFFF`: 9.2:1, exceeding WCAG 2.2 AA 4.5:1 requirement).
- **Secondary Accent**: Amber Gold `#D97706` / Amber 500 `#F59E0B` (Buttons, highlights, badges).
- **Backgrounds**:
  - Light Default: Slate 50 `#F8FAFC` / White `#FFFFFF`
  - High-Contrast Mode: Black `#000000` / Pure White `#FFFFFF`
- **Text Hierarchies**:
  - Primary: Slate 900 `#0F172A`
  - Secondary: Slate 600 `#475569`
  - Disabled/Muted: Slate 400 `#94A3B8`
- **Semantic Feedback**:
  - Success: Emerald 700 `#047857` (Bg: Emerald 50)
  - Warning: Amber 700 `#B45309` (Bg: Amber 50)
  - Danger/Dispute: Rose 700 `#BE123C` (Bg: Rose 50)

## 2. Typography & Tamil Expansion
- **Typeface**: `Noto Sans Tamil`, `system-ui`, `-apple-system`, `sans-serif`.
- **Text Expansion Accommodation**: Tamil character strings average 20–35% longer than English equivalents.
  - Buttons and table cells designed with flex wrapping and minimum heights (min 44px tap targets).
  - Base body font size: `16px` (`1rem`) on desktop, `14px` (`0.875rem`) minimum on mobile.
  - Line height: `1.5` minimum for standard text, `1.6` for Tamil body copy to prevent diacritic clipping.

## 3. Responsive Breakpoints & Grids
- **Mobile Compact**: `360px` – `390px` (Single column, 16px gutter, stacked navigation).
- **Tablet**: `768px` – `1024px` (2-column cards, collapsible drawer).
- **Desktop**: `1280px` – `1440px` (Max container `1280px`, 3/4-column card grids, horizontal table layout).

## 4. UI Component Library Specifications

### Buttons
- Primary: Background `#004B87`, text white, rounded 8px, padding 10px 18px, min-height 44px. Focus ring: 3px amber-400.
- Secondary: Background white, border 1px slate-300, text slate-800, hover bg slate-100.
- Destructive / Dispute: Background rose-600, text white.

### Data Tables
- Responsive wrapper with horizontal scroll and sticky first column on small viewports.
- Header cells: `th scope="col"`, bg slate-100, text slate-700, font-weight 700.
- Alternating rows or subtle border dividers (`border-slate-100`).

### Form Controls
- Explicit labels with `htmlFor` association.
- Mandatory focus indicators: 2px solid `#2563EB` with 2px offset.
- Inline error messages associated via `aria-describedby`.

### State Messaging
- **Empty State**: Icon, bold title in Tamil/English, descriptive reason, primary CTA button.
- **Loading State**: Accessible skeleton loader matching layout geometry; `aria-busy="true"`.
- **Error State**: Non-blocking alert banner with explicit recovery action and helpline phone number.
