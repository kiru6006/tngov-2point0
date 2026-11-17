# Shared Master Data & Cross-Module Relationships

## 1. Single Source of Truth
The architecture strictly bans duplicating departments, districts, or contact records across modules:

```
                            +--------------------------+
                            | Department Master (45)   |
                            | (Code, Category, English,|
                            |  Tamil, Website)         |
                            +------------+-------------+
                                         |
     +-------------------+---------------+-------------------+-------------------+
     |                   |                                   |                   |
     v                   v                                   v                   v
+----+-------+   +-------+-----------+               +-------+-----------+   +---+----------+
|  Services  |   | Welfare Schemes   |               | Government Orders |   | Contact Dir  |
| (Services  |   | (Administering    |               | (Issuing          |   | (Sanctioned  |
|  Catalog)  |   |  Department)      |               |  Department)      |   |  Positions)  |
+------------+   +-------------------+               +-------------------+   +--------------+
```

## 2. Invariant Referential Integrity
- `Service.department_id` -> `Department.department_id`
- `Scheme.department_id` -> `Department.department_id`
- `Position.department_id` -> `Department.department_id`
- `Position.jurisdiction_id` -> `Jurisdiction.jurisdiction_id`
- `Service.responsible_position_id` -> `Position.position_id`
- `Scheme.responsible_position_id` -> `Position.position_id`
