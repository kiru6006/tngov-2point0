# Containerization & Packaging Specification

## 1. Application Container Images
1. **API Gateway (`api/Dockerfile`)**:
   - Base Image: `python:3.12-slim`
   - Multi-stage build separating dependencies from runtime.
   - Non-root user: `tngov` (UID 10001, GID 10001).
   - Built-in container healthcheck: HTTP probe to `/health`.
2. **Web Frontend (`web/Dockerfile`)**:
   - Base Image: `node:20-alpine`
   - Multi-stage build with dependency pruning and static compilation.
   - Non-root user: `nextjs` (UID 1001, GID 1001).
   - Built-in container healthcheck: HTTP probe to port 3000.

## 2. Local & Pilot Orchestration
- Managed via [docker-compose.yml](file:///Users/apple/projects/tngov-2point0/docker-compose.yml).
- Dedicated internal network (`tngov-internal`) isolating database and external bridge network (`tngov-edge`) serving citizen traffic.
