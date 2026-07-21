# SunWise

Aplicación web para la gestión y simulación de soluciones solares. El frontend usa Vite y JavaScript; la API REST usa Express, PostgreSQL, Sequelize y JWT.

## Estructura

```text
Integrator_1/
├── frontend/          # aplicación Vite y vistas de usuario
│   ├── src/
│   └── package.json
├── backend/           # API REST, base de datos y pruebas
│   ├── src/
│   ├── test/
│   ├── .env.example
│   └── package.json
├── scripts/dev.mjs    # arranque simultáneo de frontend y backend
├── package.json       # comandos de integración
└── start-sunwise.cmd  # alternativa de arranque para Windows
```

## Ejecución

La forma recomendada y multiplataforma es ejecutar desde `Integrator_1`: `npm run setup` la primera vez y `npm run dev` para iniciar todo. También puedes iniciar solo la API con `npm run dev:backend`.

Antes de ejecutar el backend, crea `backend/.env` a partir de `backend/.env.example`. El archivo `.env` no se versiona.

Esto levanta PostgreSQL aislado en el puerto `5433`, crea las tablas y carga los datos iniciales. La API queda en `http://localhost:3000/api`; el frontend espera esa URL por defecto.

Después de ejecutar el setup una vez, también puedes iniciar todo desde `Integrator_1` con `./start-sunwise.cmd`; abrirá backend y frontend en terminales separadas.

Los archivos `.cmd` usan `npm.cmd` deliberadamente: así funcionan aunque PowerShell tenga bloqueada la ejecución de `npm.ps1`.

El seed crea `admin@sunwise.local` / `Admin123!`; cambia esta clave después del primer acceso.

También crea 3 instaladores aprobados, 2 proveedores aprobados y 8 productos para visualizar las vistas públicas. Las cuentas profesionales demo usan la contraseña `Demo123!`.

## Modelo relacional (3FN)

- `users` 1—0..1 `installers` y `users` 1—0..1 `providers`: las credenciales y el rol viven una sola vez en `users`.
- `providers` 1—N `products`.
- `users` 1—N `estimates`; `cities_hsp` 1—N `estimates`.
- `estimates` 1—N `materials_recipe`.
- `estimates` 1—N `quote_contacts`; cada contacto apunta a exactamente un `installer` o un `provider`.
- `appliance_catalog` es un catálogo independiente; la cotización conserva un snapshot JSON de los valores empleados para que un cambio posterior del catálogo no altere resultados históricos.

Las rutas de `admin`, `installer` y `provider` validan el JWT y el rol en servidor. Los recursos propios filtran también por el `userId` autenticado.

## Rutas principales

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
- CRUD propio: `/api/users/me`, `/api/estimates`, `/api/providers/products`.
- Paneles: `/api/installers/me`, `/api/installers/contacts`, `/api/providers/me`, `/api/providers/contacts`.
- Catálogo público: `/api/catalog/products`, `/api/catalog/installers`, `/api/catalog/cities`, `/api/catalog/appliances`.
- CRUD admin: `/api/admin/{users|installers|providers|products|materials|cities|appliances|estimates}` y `/api/admin/dashboard`.
