# Contact Directory Requirements & Specification (P0 Critical)

## 1. Statutory Mandate
The Government Contact Directory provides citizens, legal practitioners, administrative departments, and media with authenticated, verified contact details for Tamil Nadu public administration across State, District, Taluk, and Municipal levels.

## 2. Structural Scope & Entities
1. **State Leadership**:
   - Governor of Tamil Nadu
   - Hon'ble Chief Minister
   - Council of Ministers with statutory portfolios
   - Chief Secretary to Government
2. **Secretariat Administration**:
   - Additional Chief Secretaries, Principal Secretaries, and Secretaries to Government
   - Departmental wings and sections
3. **Executive & Field Administration**:
   - Heads of Departments (HoDs), Commissioners, and Directors
   - District Collectors (38 Districts)
   - District Revenue Officers (DROs)
   - Revenue Divisional Officers (RDOs)
   - Tahsildars and Taluk Administration
4. **Autonomous & Statutory Bodies**:
   - Government Undertakings, Corporations (e.g. ELCOT, TNeGA, SIPCOT), and Boards

## 3. Data Integrity Invariant
- A Position definition (`positions`) exists perpetually regardless of vacancy.
- An individual officer (`persons`) is assigned to a position via `position_assignments` containing `start_date`, `end_date`, `transfer_go_ref`, and `workflow_status`.
- Historical tenures must be retained for administrative audit and public records.
