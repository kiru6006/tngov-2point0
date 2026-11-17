# System Integration & External Interface Audit

## 1. Classification of External Interfaces
All integrations connecting TN Portal 2.0 to existing state ecosystems were audited:
1. **TNeGA e-Sevai Gateway**: External verified deep links for service application submission (`https://www.tnesevai.tn.gov.in`).
2. **TN Revenue Land Records (AnyTNPatta)**: External deep link integration for Patta Chitta download (`https://eservices.tn.gov.in/eservicesnew/land/chitta.html`).
3. **Government Orders Portal (CMS tn.gov.in)**: Authoritative document download links for verified Government Orders.
4. **CM Helpline 1100 / Grievance Redressal**: Direct telephone integration (`tel:1100`) and e-Pravu portal linkage.

## 2. Integrity & Health Check
All integrated URLs use HTTPS and resolve to authoritative `.tn.gov.in` institutional subdomains without broken redirects.
