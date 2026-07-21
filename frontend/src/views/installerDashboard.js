import DashboardShell from "../components/dashboard/dashboardShell.js";
import SummaryCard from "../components/dashboard/summaryCard.js";
import DataTable from "../components/dashboard/dataTable.js";
import LoadingState from "../components/common/loadingState.js";
import { initNavbar } from "../components/layout/navbar.js";
import { getInstallerContacts, getInstallerProfile, updateInstallerContact, updateInstallerProfile } from "../api/installer.js";
import { escapeHtml, showFeedback } from "../utils/dom.js";

export default function InstallerDashboard() {
  const load = async () => {
    const target = document.getElementById("installer-dashboard-content");
    try {
      const [{ installer }, { contacts }] = await Promise.all([getInstallerProfile(), getInstallerContacts()]);
      target.innerHTML = `<div class="summary-grid">${SummaryCard({ label: "Estado", value: installer.verificationStatus, icon: "✓" })}${SummaryCard({ label: "Calificación", value: `${installer.rating} / 5`, icon: "★" })}${SummaryCard({ label: "Solicitudes", value: contacts.length, icon: "▤" })}</div><div class="dashboard-columns"><section class="app-card"><h2>Perfil profesional</h2><form id="installer-profile-form" class="app-form"><label class="form-field"><span>Empresa</span><input name="companyName" value="${escapeHtml(installer.companyName)}" required></label><label class="form-field"><span>Ciudad</span><input name="city" value="${escapeHtml(installer.city)}" required></label><label class="form-field"><span>Descripción</span><textarea name="bio">${escapeHtml(installer.bio || "")}</textarea></label><label class="switch-field"><input name="available" type="checkbox" ${installer.available ? "checked" : ""}><span>Disponible para nuevos proyectos</span></label><div id="installer-profile-feedback"></div><button class="btn-primary" type="submit">Guardar perfil</button></form></section><section class="app-card"><h2>Cotizaciones recibidas</h2><div id="installer-contact-table">${DataTable({ headers: ["Cliente", "Proyecto", "Estado"], rows: contacts.map((contact) => `<tr><td><strong>${escapeHtml(contact.estimate.user.name)}</strong><small>${escapeHtml(contact.estimate.user.phone)}</small></td><td>#${contact.estimateId} · ${contact.estimate.panelCount} paneles</td><td><select data-contact-status="${contact.id}"><option value="sent" ${contact.status === "sent" ? "selected" : ""}>Enviado</option><option value="read" ${contact.status === "read" ? "selected" : ""}>Leído</option><option value="answered" ${contact.status === "answered" ? "selected" : ""}>Respondido</option></select></td></tr>`), empty: "Aún no has recibido solicitudes." })}</div></section></div>`;
      document.getElementById("installer-profile-form").addEventListener("submit", async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); data.available = event.currentTarget.available.checked; try { await updateInstallerProfile(data); showFeedback(document.getElementById("installer-profile-feedback"), "Perfil actualizado.", "success"); } catch (error) { showFeedback(document.getElementById("installer-profile-feedback"), error.message); } });
      target.querySelectorAll("[data-contact-status]").forEach((select) => select.addEventListener("change", () => updateInstallerContact(select.dataset.contactStatus, select.value)));
    } catch (error) { target.innerHTML = `<div class="empty-state error">${escapeHtml(error.message)}</div>`; }
  };
  setTimeout(() => { initNavbar(); load(); }, 0);
  return DashboardShell({ title: "Panel de instalador", subtitle: "Gestiona tu disponibilidad y atiende solicitudes de usuarios.", content: `<div id="installer-dashboard-content">${LoadingState()}</div>` });
}
