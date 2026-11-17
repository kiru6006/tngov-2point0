# Production Dockerfile for Tamil Nadu Government Portal 2.0 API Gateway
FROM python:3.12-slim AS builder

WORKDIR /build
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runtime

# Security hardening: Create non-root system user
RUN groupadd -r tngov && useradd -r -g tngov -u 10001 -s /sbin/nologin tngov

WORKDIR /app

# Copy python dependencies from builder
COPY --from=builder /root/.local /home/tngov/.local
ENV PATH=/home/tngov/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy application source
COPY . /app

# Change ownership to non-root user
RUN chown -R tngov:tngov /app /home/tngov

USER tngov

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
