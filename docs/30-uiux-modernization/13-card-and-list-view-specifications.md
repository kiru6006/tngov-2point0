# Card and List View Synchronization Specifications
**Document Reference: TN-GOV-2.0-MOD-13**

---

### 1. Universal Dual-View Requirement
All primary browsing modules (Services, Schemes, Directory, Grievances, Performance, Documents) implement a synchronized **Card View / Table (List) View** toggle:

1. **Card View**:
   - Touch-friendly visual card representation.
   - Highlights key summary attributes, badges, and quick-action buttons.
   - Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop.
2. **Table (List) View**:
   - High-density tabular layout optimized for bureaucratic scanning and bulk reviews.
   - Fixed header with sortable columns (SLA %, Volume, Date).
   - Horizontal scrolling container (`overflow-x-auto`) preventing mobile layout breakage.

### 2. State Synchronization
Toggling between Card and Table preserves all active filters (department, district, cadre, search query), preventing state reset.
