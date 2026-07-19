import Navbar, { initNavbar } from "../components/layout/navbar.js";
import Input from "../components/common/input.js";
import { login } from "../api/auth.js";
import { dashboardPath, saveSession } from "../services/authService.js";
import { showFeedback } from "../utils/dom.js";

export default function Login() {
  setTimeout(() => {
    initNavbar();
    document.getElementById("login-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const feedback = document.getElementById("login-feedback");
      const button = event.currentTarget.querySelector("button");
      button.disabled = true;
      try {
        const session = await login(Object.fromEntries(new FormData(event.currentTarget)));
        saveSession(session);
        const returnPath = session.user.role === "user" ? sessionStorage.getItem("sunwise_return") : null;
        sessionStorage.removeItem("sunwise_return");
        window.location.hash = returnPath || dashboardPath(session.user.role);
      } catch (error) {
        showFeedback(feedback, error.details?.join(". ") || error.message);
      } finally { button.disabled = false; }
    });
  }, 0);
  return `${Navbar()}<main class="auth-page"><section class="auth-card"><span class="badge-top">Bienvenido de nuevo</span><h1>Inicia sesión</h1><p>Consulta tus cotizaciones y continúa diseñando tu sistema solar.</p><form id="login-form" class="app-form">${Input({ id: "email", label: "Correo electrónico", type: "email", required: true })}${Input({ id: "password", label: "Contraseña", type: "password", required: true })}<div id="login-feedback" aria-live="polite"></div><button class="btn-primary big" type="submit">Ingresar</button></form><p class="auth-switch">¿Aún no tienes cuenta? <a href="#/register">Regístrate</a></p></section></main>`;
}
