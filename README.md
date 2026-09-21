# Retroshop

DVD retail calculator.

## Getting Started

### Option 1: Docker Compose (recommended)

**Prerequisites:** Docker installed on your machine.

1. Copy the example environment file and adjust variables if needed:

```bash
cp .env.example .env
```

> The defaults use port `3000` for the frontend and `3001` for the backend. If those are taken, update `FRONTEND_PORT` and `BACKEND_PORT` in `.env`. If you change `BACKEND_PORT`, make sure `NEXT_PUBLIC_API_URL` in `.env` reflects the new port as well; otherwise, you could see a **Network Error** when calculating the price.

2. Build and start all services:

```bash
docker compose up -d --build
```

3. Open [http://localhost:3000](http://localhost:3000) (or the port you configured).

This runs the project in **production mode**.

---

### Option 2: Manual setup

**Prerequisites:** Node 24, [pnpm](https://pnpm.io/).

1. Install dependencies from the repo root:

```bash
pnpm i
```

2. Start the development servers:

```bash
pnpm dev
```

This runs the project in **development mode** with hot-reload across all apps.

## Running Tests

From the repo root (requires Node 24 + pnpm).

Run `pnpm i` first if you haven't:

```bash
pnpm test
```

This runs the backend unit tests and the E2E test via Turborepo.

## Repository Structure

```
retroshop/
├── apps/
│   ├── backend/           REST API (NestJS)
│   └── web/               Frontend (Next.js)
├── packages/
│   ├── shared/            TypeScript contracts
│   ├── eslint-config/     ESLint configuration
│   └── typescript-config/ tsconfig bases
├── docs/
│   └── adr/               Architecture Decision Records
├── docker-compose.yml
└── turbo.json
```
## Architecture

The project is a **pnpm + Turborepo monorepo** with two apps sharing one typed-contract package.

### Backend (`apps/backend`)

NestJS REST API implementing a light **Domain-Driven Design** layering for separation of concerns and easy extensibility.

| Module | Responsibility |
|--------|---------------|
| `cart` | Domain logic split into **application** (use cases), **domain** (pure logic), and **presentation** (HTTP DTOs + controllers). Exposes `POST /cart/calculate`. |
| `shared` | `DomainException` handling and HTTP mapping for consistent REST error responses. |

**Testing:**
- Unit tests cover pure domain logic.
- One E2E test provides overall integration coverage.

### Frontend (`apps/web`)

Next.js single-page app that consumes the backend `POST /cart/calculate` endpoint.

### Shared contracts (`packages/shared`)

TypeScript types and DTOs shared between frontend and backend, keeping the API contract in one place.

### Architecture Decision Records

Design decisions are documented as ADRs in [`/docs/adr`](docs/adr/).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo tooling | Turborepo + pnpm workspaces |
| Backend | NestJS |
| Frontend | Next.js |
| Containerisation | Docker Compose |
