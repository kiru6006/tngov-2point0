# Administrative Hierarchy & Reporting Structure (P0)

## 1. Statutory Governance Tree
Reporting structure is department-specific. Universal flat hierarchy prohibited.

State of Tamil Nadu
├── Constitutional Leadership (Governor, Chief Minister, Cabinet Ministers)
├── Chief Secretary (Secretariat Apex)
└── Administrative Departments (e.g. Highways and Minor Ports, Revenue)
    ├── Additional Chief Secretary / Principal Secretary
    │   ├── Heads of Departments (Commissioners / Directors)
    │   │   ├── Regional Offices (Joint Directors / Superintending Engineers)
    │   │   │   ├── District Collectorates & District Officers
    │   │   │   └── Divisional / Taluk Subordinate Offices
    └── Boards, Corporations & Statutory PSUs (MD / CEO / Chairman)

## 2. Dynamic Hierarchy Rules
- Positions link via reports_to_position_id.
- Vacant positions retain node position in org tree; display Status: Vacant (never show former officer).
- Dual reporting (Administrative Department vs District Collector) supported via secondary relationship metadata.
