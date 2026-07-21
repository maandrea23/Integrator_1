# SunWise

Web application for managing and simulating solar-energy solutions. The frontend uses Vite and JavaScript; the REST API uses Express, PostgreSQL, Sequelize, and JWT.

## Project Structure

```text
Integrator_1/
├── frontend/          # Vite application and user views
│   ├── src/
│   └── package.json
├── backend/           # REST API, database, and tests
│   ├── src/
│   ├── test/
│   ├── .env.example
│   └── package.json
├── scripts/dev.mjs    # starts frontend and backend together
├── package.json       # integration commands
└── start-sunwise.cmd  # Windows startup alternative
```

## Running Locally

From `Integrator_1`, run `npm run setup` the first time, then use `npm run dev` to start both services. You can start only the API with `npm run dev:backend`.

Before running the backend, create `backend/.env` from `backend/.env.example`. The `.env` file is not versioned.

This starts an isolated PostgreSQL instance on port `5433`, creates the tables, and loads seed data. The API is available at `http://localhost:3000/api`; the frontend uses that URL by default.

After the initial setup, you can also start both services from `Integrator_1` with `./start-sunwise.cmd`. It opens the backend and frontend in separate terminals.

The `.cmd` files intentionally use `npm.cmd` so they work even when PowerShell blocks the execution of `npm.ps1`.

The seed creates `admin@sunwise.local` / `Admin123!`; change this password after the first login.

It also creates 3 approved installers, 2 approved providers, and 8 products for the public views. Demo professional accounts use the password `Demo123!`.

## Relational Model (3NF)

- `users` 1—0..1 `installers` and `users` 1—0..1 `providers`: credentials and roles are stored only once in `users`.
- `providers` 1—N `products`.
- `users` 1—N `estimates`; `cities_hsp` 1—N `estimates`.
- `estimates` 1—N `materials_recipe`.
- `estimates` 1—N `quote_contacts`; each contact references exactly one `installer` or `provider`.
- `appliance_catalog` is an independent catalog. Each quote retains a JSON snapshot of the values used, so later catalog changes do not alter historical results.

The `admin`, `installer`, and `provider` routes validate both the JWT and the role on the server. Personal resources are also filtered by the authenticated `userId`.

## Main Routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
- Personal CRUD: `/api/users/me`, `/api/estimates`, `/api/providers/products`.
- Dashboards: `/api/installers/me`, `/api/installers/contacts`, `/api/providers/me`, `/api/providers/contacts`.
- Public catalog: `/api/catalog/products`, `/api/catalog/installers`, `/api/catalog/cities`, `/api/catalog/appliances`.
- Admin CRUD: `/api/admin/{users|installers|providers|products|materials|cities|appliances|estimates}` and `/api/admin/dashboard`.
