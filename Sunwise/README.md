views/
│── home.js
│── login.js
│── register.js
│── client.js
│── wizard.js
│── results.js
│── history.js
│── profile.js
│── admin.js
└── notFound.js

---
- home.js → Página principal donde se presenta SunWise.
- login.js → Inicio de sesión.
-register.js → Registro de nuevos usuarios.
- client.js → Panel principal del cliente.
- wizard.js → El cuestionario para recopilar los datos del sistema fotovoltaico.
- results.js → Muestra el cálculo realizado (paneles, inversor, baterías, materiales, ahorro, etc.).
- history.js → Historial de presupuestos realizados por el cliente.
- profile.js → Información del usuario y edición de datos.
- admin.js → Panel del administrador.
- notFound.js → Página 404 cuando la ruta no existe.

---
Carpeta	¿Para qué sirve?
api/	Funciones que hacen las peticiones al backend (o las simulan mientras no exista).
components/	Componentes reutilizables como Navbar, Button, Card, Inputs, etc.
routes/	Maneja la navegación entre las vistas.
styles/	Todos los archivos CSS.
views/	Las páginas completas que ve el usuario.
main.js	Inicia la aplicación.

## Project Structure

### api
Handles communication with the backend.

- **auth.js:** Login, register, and logout.
- **estimate.js:** Sends the wizard data and receives the solar estimate.
- **user.js:** Retrieves and updates user information.

---

### components
Reusable UI components.

- **common/** → Shared components (Button, Input, Card, Modal).
- **layout/** → Application structure (Navbar, Sidebar, Header, Footer).
- **wizard/** → Components used by the solar estimation wizard.
- **dashboard/** → Components for client and admin dashboards.

---

###  routes
Manages navigation between application views.

---

###  styles
Contains all CSS files for the application.

---

### views
Contains the main application pages.

- Home
- Login
- Register
- Client Dashboard
- Wizard
- Results
- History
- Admin

---

### main.js
Application entry point. Initializes the app and loads the routes.