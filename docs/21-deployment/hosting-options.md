# Government Hosting Evaluation & Comparison

| Hosting Option | Security & Sovereign Compliance | Data Residency | Scalability & SLA | Estimated Monthly Cost | Operational Suitability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tamil Nadu State Data Centre (TNSDC)** | Meets all state data localization guidelines; dedicated government network. | 100% On-Premises (Perungudi / Navalur). | Vertical scaling via VMware / OpenStack. | Low (Sunk government capex). | **RECOMMENDED PRIMARY FOR PRODUCTION** |
| **National Informatics Centre (NIC MeghRaj)** | CERT-In audited; GI Cloud empanelment. | Sovereign Indian boundaries (Delhi / Hyderabad / Chennai). | Autoscaling container services available. | Moderate (Inter-governmental billing). | High (Alternate sovereign option) |
| **MeitY-Empaneled Commercial Cloud (GCP/AWS/Azure India)** | MeitY sovereign clearance; enterprise KMS & HSM. | Indian data centers (Chennai / Mumbai / Hyderabad). | Elastic horizontal autoscaling; multi-zone HA. | Variable opex based on compute/storage tier. | **RECOMMENDED FOR CONTROLLED PILOT PHASE** |
