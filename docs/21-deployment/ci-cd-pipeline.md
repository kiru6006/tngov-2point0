# GitHub Actions CI/CD Pipeline & Quality Gates

## 1. Pull Request Validation Workflow (`pr-check.yml`)
Triggers on every PR targeting `main`:
- Checks out code.
- Installs Python 3.12 & Node 20 environments.
- Executes full pytest regression suite (82 tests across API, RAG, directory, security, accessibility, and E2E journeys).
- Executes Next.js static production build (`npm run build`).
- PR merge is blocked unless all checks pass with zero failures.

## 2. Release & Pilot Promotion Workflow (`release-pipeline.yml`)
Triggers on version tags (`v*.*.*`) or manual dispatch:
- Executes full build and test suites.
- Deploys container image artifacts to isolated staging environment.
- Executes automated smoke tests and health checks.
- Enforces manual approval gate before pilot promotion.
