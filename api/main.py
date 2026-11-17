import os
import json
import csv
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Tamil Nadu Government Digital Portal 2.0 API Gateway",
    description="Asynchronous REST API Gateway connecting public portal to administrative directories, document intelligence, and e-Sevai status proxies.",
    version="2.0.0",
)

# 1. CORS Middleware (Next.js 19 integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://tn.gov.in"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Path Helpers
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
WEB_DATA_DIR = os.path.join(BASE_DIR, "web", "src", "data")

# 3. Models
class TrackResponse(BaseModel):
    application_id: str
    service_name: str
    status: str
    stage_number: int
    current_office: str
    statutory_sla_days: int
    filing_date: str
    last_updated: str

# 4. Endpoints
@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "portal": "Tamil Nadu Government Portal 2.0",
        "compliance": "GIGW 3.0 / DPDP Act 2023",
    }

@app.get("/api/v1/services", tags=["Services"])
def list_services(category: Optional[str] = None):
    csv_path = os.path.join(DATA_DIR, "service-catalogue.csv")
    if not os.path.exists(csv_path):
        raise HTTPException(status_code=404, detail="Service catalogue missing")
    
    services = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not category or category.lower() in row["citizen_category"].lower():
                services.append(row)
    return {"count": len(services), "services": services}

@app.get("/api/v1/services/{service_id}", tags=["Services"])
def get_service(service_id: str):
    csv_path = os.path.join(DATA_DIR, "service-catalogue.csv")
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["service_id"] == service_id:
                return row
    raise HTTPException(status_code=404, detail="Service ID not found")

@app.get("/api/v1/contacts", tags=["P0 Contact Directory"])
def list_contacts(
    query: Optional[str] = None,
    department: Optional[str] = None,
    district: Optional[str] = None,
    cadre: Optional[str] = None,
):
    contacts_path = os.path.join(WEB_DATA_DIR, "contacts.json")
    if not os.path.exists(contacts_path):
        raise HTTPException(status_code=404, detail="Contacts database missing")
    
    with open(contacts_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        officials = data.get("officials", [])

    filtered = officials
    if query:
        q = query.lower()
        filtered = [
            o for o in filtered
            if q in o["name_en"].lower() or q in o["name_ta"].lower() or q in o["designation_en"].lower()
        ]
    if department and department != "ALL":
        filtered = [o for o in filtered if department.lower() in o["department_en"].lower()]
    if district and district != "ALL":
        filtered = [o for o in filtered if district.lower() in o["district_en"].lower()]
    if cadre:
        filtered = [o for o in filtered if o["cadre"].lower() == cadre.lower()]

    return {"count": len(filtered), "officials": filtered}

@app.get("/api/v1/documents", tags=["Document Intelligence"])
def list_documents(year: Optional[str] = None, doc_type: Optional[str] = None):
    docs_path = os.path.join(WEB_DATA_DIR, "documents.json")
    if not os.path.exists(docs_path):
        raise HTTPException(status_code=404, detail="Documents registry missing")

    with open(docs_path, "r", encoding="utf-8") as f:
        documents = json.load(f)

    if year and year != "ALL":
        documents = [d for d in documents if d["year"] == year]
    if doc_type and doc_type != "ALL":
        documents = [d for d in documents if doc_type.lower() in d["type"].lower()]

    return {"count": len(documents), "documents": documents}

@app.get("/api/v1/track/{app_id}", response_model=TrackResponse, tags=["Tracking Gateway"])
def track_application(app_id: str):
    clean_id = app_id.strip().upper()
    if len(clean_id) < 8:
        raise HTTPException(status_code=400, detail="Application ID must be 8-12 alphanumeric characters")
    
    # Simulated statutory proxy contract with TNeGA e-Sevai
    return TrackResponse(
        application_id=clean_id,
        service_name="Community Certificate / சாதிச் சான்றிதழ்",
        status="Under Review by Tahsildar",
        stage_number=3,
        current_office="Taluk Office, Egmore, Chennai",
        statutory_sla_days=15,
        filing_date="2026-11-10",
        last_updated="2026-11-17 14:30 IST",
    )
