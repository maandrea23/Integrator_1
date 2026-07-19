import Navbar, { initNavbar } from "../components/layout/navbar.js";
import Input from "../components/common/input.js";
import { register } from "../api/auth.js";
import { dashboardPath, saveSession } from "../services/authService.js";
import { showFeedback } from "../utils/dom.js";

export default function Register() {
  setTimeout(() => {
    initNavbar();
    const role = document.getElementById("role");
    const professional = document.getElementById("professional-fields");
    const syncRoleFields = () => {
      const isProfessional = ["installer", "provider"].includes(role.value);
      professional.hidden = !isProfessional;
      document.getElementById("company-label").textContent = role.value === "provider" ? "Nombre de la tienda *" : "Nombre de la empresa *";
    };
    role.addEventListener("change", syncRoleFields);
    syncRoleFields();
    document.getElementById("register-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      if (data.role === "installer") data.companyName = data.company;
      if (data.role === "provider") data.storeName = data.company;
      delete data.company;
      const feedback = document.getElementById("register-feedback");
      const button = event.currentTarget.querySelector("button");
      button.disabled = true;
      try {
        const session = await register(data);
        saveSession(session);
        window.location.hash = dashboardPath(session.user.role);
      } catch (error) { showFeedback(feedback, error.details?.join(". ") || error.message); }
      finally { button.disabled = false; }
    });
  }, 0);
  return `${Navbar()}<main class="auth-page"><section class="auth-card wide"><span class="badge-top">Únete a SunWise</span><h1>Crea tu cuenta</h1><p>Los instaladores y proveedores quedan pendientes hasta la revisión del administrador.</p><form id="register-form" class="app-form form-grid">${Input({ id: "name", label: "Nombre completo", required: true })}${Input({ id: "email", label: "Correo electrónico", type: "email", required: true })}${Input({ id: "phone", label: "Teléfono", type: "tel", required: true, placeholder: "+57 300 000 0000" })}${Input({ id: "password", label: "Contraseña (mínimo 8 caracteres)", type: "password", required: true })}<label class="form-field"><span>Tipo de cuenta *</span><select id="role" name="role"><option value="user">Usuario</option><option value="installer">Instalador</option><option value="provider">Proveedor</option></select></label><div id="professional-fields" class="professional-fields"><label class="form-field"><span id="company-label">Nombre de empresa *</span><input name="company"></label>${Input({ id: "city", label: "Ciudad" })}</div><div id="register-feedback" class="full-field" aria-live="polite"></div><button class="btn-primary big full-field" type="submit">Crear cuenta</button></form><p class="auth-switch">¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p></section></main>`;
}
