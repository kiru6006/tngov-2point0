# Responsive Viewports Matrix & Device Compatibility
**Document Reference: TN-GOV-2.0-MOD-02**

---

### 1. Mandated Viewport Breakpoint Specifications
The portal UI layout is audited and verified across 10 discrete responsive widths:

| Viewport Width | Device Category | Target Representative Hardware | Layout Behavior | Navigation Mode |
|---|---|---|---|---|
| **320px** | Ultra-Compact Mobile | iPhone SE (1st Gen), JioPhone Next | 1 Column, 12px padding, stacked actions | Slide-out Drawer |
| **360px** | Standard Mobile Small | Samsung Galaxy A series, Redmi 9A | 1 Column, 14px padding, fluid typography | Slide-out Drawer |
| **390px** | Standard Mobile Medium | iPhone 12/13/14/15/16 Pro | 1 Column, 16px padding, 44px touch targets | Slide-out Drawer |
| **430px** | Large Mobile | iPhone 14/15/16 Pro Max, Pixel 8 Pro | 1-2 Columns for cards, 16px padding | Slide-out Drawer |
| **768px** | Small Tablet (Portrait) | iPad Mini, Samsung Galaxy Tab A | 2 Columns, 16px padding, compact tables | Slide-out Drawer |
| **820px** | Standard Tablet | iPad Air (Portrait), Surface Go | 2-3 Columns, 18px padding | Slide-out Drawer |
| **1024px** | Tablet Landscape / Small Laptop | iPad Pro, Chromebook, 11" Laptops | 3 Columns, 20px padding | Left Sidebar (Collapsed: 64px) |
| **1280px** | Desktop Standard | HD Monitor, MacBook Air/Pro 13" | 3-4 Columns, 20px padding | Left Sidebar (Expanded: 224px) |
| **1440px** | Desktop Wide | FHD 1080p Standard Workstation | 4 Columns, 24px padding | Left Sidebar (Expanded: 224px) |
| **1920px** | Large Display / Kiosk | 1080p FHD / 4K Kiosk Display | 4-6 Columns, Max-width 1280px centered | Left Sidebar (Expanded: 224px) |

### 2. Viewport Rules & Invariants
1. **Zero Horizontal Scroll**: No element declared with rigid pixel widths $>320	ext{px}$ without appropriate breakpoint classes (`sm:`, `md:`, `lg:`).
2. **Touch Targets**: All buttons, links, inputs, and toggles enforce a minimum touch bounding box of 	imes 44	ext{px}$ on touch devices ($<1024	ext{px}$).
3. **Fluid Typography**: Dynamic text scaling ensuring Tamil glyphs (`஀-௿`) maintain baseline line-height ($\ge 1.4$) without clipping ascenders/descenders.
