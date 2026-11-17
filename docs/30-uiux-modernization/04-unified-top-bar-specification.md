# Unified Top Utility Bar Specification
**Document Reference: TN-GOV-2.0-MOD-04**

---

### 1. Functional Scope & Anti-Duplication Rule
The top bar is strictly a **utility and accessibility strip**. It contains zero primary navigation menus, mega menus, or category links, eliminating navigation duplication across the application.

### 2. Component Inventory & Layout
The utility bar spans 100% width with a compact height of 48px:

```
+---------------------------------------------------------------------------------------------------------+
| [Menu/Toggle] [TN Emblem] [Portal Title]   | [Compact Global Search] | [Citizen/Official] [EN/TA] [A- A A+] [Sun] [1100] |
+---------------------------------------------------------------------------------------------------------+
```

1. **Sidebar Collapse / Drawer Toggle**:
   - Mobile: Triggers slide-out drawer (`aria-label="Open navigation menu"`).
   - Desktop: Toggles expanded/collapsed sidebar (`aria-label="Toggle left sidebar"`).
2. **State Branding & Title**:
   - Official Tamil Nadu Emblem (32px circular SVG badge).
   - Bilingual title: "Government of Tamil Nadu | தமிழ்நாடு அரசு".
3. **Compact Global Search**:
   - Width: 256px to 320px.
   - Searches services, G.O. documents, schemes, and official directory.
   - Submits directly to `/search?q=...`.
4. **Workspace Mode Switcher**:
   - Segmented control: "Citizen" (`public`) vs. "Official" (`official`).
   - Instantly pivots sidebar navigation and homepage dashboard widgets.
5. **Bilingual Toggle**:
   - Segmented button: `EN` (English - Default) and `தமிழ்` (Tamil).
   - Global reactive state update across all labels and data models.
6. **Accessibility Text Resizer**:
   - Three-state button group: `A-` (0.9x), `A` (1.0x), `A+` (1.2x).
   - Dynamically scales application root typography.
7. **High Contrast Toggle**:
   - Switches color palette to WCAG AAA High Contrast mode (black background with #FACC15 yellow accents).
8. **Emergency 1100 CM Helpline**:
   - Direct click-to-call link (`tel:1100`) in high-visibility red badge.
