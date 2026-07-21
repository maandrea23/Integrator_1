import { clearSession, dashboardPath, getSessionUser } from "../../services/authService.js";
import { escapeHtml } from "../../utils/dom.js";

export default function Navbar() {
  const user = getSessionUser();
  const currentPath = window.location.hash.slice(1).split("?")[0] || "/";
  const navLink = (path, id, label) => `<a href="#${path}" id="${id}" class="nav-btn${currentPath === path ? " active" : ""}" ${currentPath === path ? 'aria-current="page"' : ""}>${label}</a>`;
  const authLinks = user
    ? `<a href="#${dashboardPath(user.role)}" class="btn-outline">${escapeHtml(user.name.split(" ")[0])}</a><button id="btn-logout" class="btn-primary">Salir</button>`
    : `<a href="#/register" id="btn-register" class="btn-outline">Registrarse</a><a href="#/login" class="btn-primary">Ingresar</a>`;

  return `<header class="navbar">
    <a class="logo" href="#/" aria-label="Ir al inicio"><span>Sun</span>wise</a>
    <nav class="nav-center">
      ${navLink("/", "btn-home", "Inicio")}
      ${navLink("/wizard", "btn-wizard", "Simular")}
      ${navLink("/marketplace", "btn-marketplace", "Marketplace")}
      ${navLink("/installers", "btn-installers", "Instaladores")}
    </nav>
    <div class="nav-right">${authLinks}</div>
    <button class="menu-hamburger" type="button" aria-label="Abrir menú"><span></span><span></span><span></span></button>
  </header>`;
}

export function initNavbar() {
  document.getElementById("btn-logout")?.addEventListener("click", () => {
    clearSession();
    window.location.hash = "/";
  });
  const menu = document.querySelector(".menu-hamburger");
  const nav = document.querySelector(".nav-center");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("show"));
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("show")));
  }
}
