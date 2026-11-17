import time
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_api_latency_sla():
    """
    Performance SLA: API Gateway response times must be < 50ms
    to sustain LCP < 2.5s on mobile/simulated 3G networks.
    """
    endpoints = [
        "/health",
        "/api/v1/services",
        "/api/v1/contacts",
        "/api/v1/documents",
        "/api/v1/track/TNREV123456",
    ]

    for ep in endpoints:
        start = time.perf_counter()
        resp = client.get(ep)
        elapsed_ms = (time.perf_counter() - start) * 1000
        assert resp.status_code == 200
        assert elapsed_ms < 100.0, f"Endpoint {ep} took {elapsed_ms:.2f}ms (threshold 100ms)"


def test_payload_size_budget():
    """
    Payload Size Budget for Low-Bandwidth Networks:
    JSON responses should be compressed/compact (< 50KB).
    """
    resp = client.get("/api/v1/contacts")
    assert resp.status_code == 200
    size_kb = len(resp.content) / 1024.0
    assert size_kb < 50.0, f"Contacts response payload {size_kb:.2f}KB exceeds 50KB budget"


def test_hybrid_search_performance():
    """
    RAG Hybrid Search query latency budget: < 200ms
    """
    start = time.perf_counter()
    resp = client.post("/api/v1/search/hybrid", json={"query": "Highways Department Policy Note"})
    elapsed_ms = (time.perf_counter() - start) * 1000
    assert resp.status_code == 200
    assert elapsed_ms < 300.0, f"Hybrid search took {elapsed_ms:.2f}ms"
