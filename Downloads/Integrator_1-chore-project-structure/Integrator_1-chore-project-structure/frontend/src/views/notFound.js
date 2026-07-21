import Navbar, { initNavbar } from "../components/layout/navbar.js";

export default function NotFound() {
  setTimeout(initNavbar, 0);
  return `${Navbar()}<main class="auth-page"><section class="auth-card centered"><span class="badge-top">Error 404</span><h1>Página no encontrada</h1><p>La ruta que buscas no existe o fue movida.</p><a class="btn-primary big" href="#/">Volver al inicio</a></section></main>`;
}
