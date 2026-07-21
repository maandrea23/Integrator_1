import DashboardShell from "../components/dashboard/dashboardShell.js";
import Input from "../components/common/input.js";
import { initNavbar } from "../components/layout/navbar.js";
import { updateProfile } from "../api/user.js";
import { getSessionUser, refreshSession } from "../services/authService.js";
import { escapeHtml, showFeedback } from "../utils/dom.js";

export default function Profile() {
  const user = getSessionUser();
  setTimeout(() => {
    initNavbar();
    document.getElementById("profile-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      if (!data.password) delete data.password;
      try { await updateProfile(data); await refreshSession(); showFeedback(document.getElementById("profile-feedback"), "Perfil actualizado correctamente.", "success"); }
      catch (error) { showFeedback(document.getElementById("profile-feedback"), error.message); }
    });
  }, 0);
  return DashboardShell({ title: "Mi perfil", subtitle: "Mantén tus datos de contacto actualizados.", content: `<section class="app-card profile-card"><form id="profile-form" class="app-form form-grid">${Input({ id: "name", label: "Nombre", value: escapeHtml(user?.name), required: true })}${Input({ id: "email", label: "Correo", type: "email", value: escapeHtml(user?.email), required: true })}${Input({ id: "phone", label: "Teléfono", type: "tel", value: escapeHtml(user?.phone), required: true })}${Input({ id: "password", label: "Nueva contraseña (opcional)", type: "password" })}<div id="profile-feedback" class="full-field"></div><button class="btn-primary full-field" type="submit">Guardar cambios</button></form></section>` });
}
