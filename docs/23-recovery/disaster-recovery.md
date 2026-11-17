# Disaster Recovery & Business Continuity Plan

## 1. RPO & RTO Objectives
- **Recovery Point Objective (RPO)**: $< 5\text{ minutes}$ (via continuous streaming replication).
- **Recovery Time Objective (RTO)**: $< 30\text{ minutes}$ (automated container re-provisioning).

## 2. Disaster Recovery Topologies
- **Primary Site**: Tamil Nadu State Data Centre (Chennai).
- **DR Standby Site**: National Data Centre / Disaster Recovery Site (Hyderabad / Delhi).
- Hot standby database maintains asynchronous streaming replication with automated failover trigger.
