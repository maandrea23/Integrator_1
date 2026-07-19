import Navbar, { initNavbar } from "../components/layout/navbar.js";
import Footer from "../components/layout/footer.js";
import LoadingState from "../components/common/loadingState.js";
import Modal, { initModals } from "../components/common/modal.js";
import { getInstallers } from "../api/installer.js";
import { contactForEstimate, getEstimates } from "../api/estimate.js";
import { getSessionUser, isAuthenticated } from "../services/authService.js";
import { escapeHtml, showFeedback } from "../utils/dom.js";

export default function Installers() {
  let selectedInstaller = null;
  setTimeout(async () => {
    initNavbar(); initModals();
    const target = document.getElementById("installer-grid");
    try {
      const { installers } = await getInstallers();
      target.innerHTML = installers.length ? installers.map((installer) => `<article class="installer-card"><div class="installer-avatar">${escapeHtml(installer.companyName.slice(0, 2).toUpperCase())}</div><div><span class="status-badge approved">Verificado</span><h3>${escapeHtml(installer.companyName)}</h3><p>${escapeHtml(installer.bio || "Especialista en sistemas fotovoltaicos.")}</p><div class="installer-meta"><span>⌖ ${escapeHtml(installer.city)}</span><span>★ ${installer.rating}</span><span>${installer.available ? "Disponible" : "No disponible"}</span></div></div><button class="btn-primary" data-contact-installer="${installer.id}" ${installer.available ? "" : "disabled"}>Solicitar contacto</button></article>`).join("") : `<div class="empty-state">No hay instaladores verificados disponibles.</div>`;
      target.querySelectorAll("[data-contact-installer]").forEach((button) => button.addEventListener("click", async () => {
        if (!isAuthenticated() || getSessionUser()?.role !== "user") { window.location.hash = "/login"; return; }
        selectedInstaller = Number(button.dataset.contactInstaller);
        const { estimates } = await getEstimates();
        document.getElementById("installer-estimate").innerHTML = estimates.map((item) => `<option value="${item.id}">Cotización #${item.id} · ${item.cityHsp.city}</option>`).join("");
        document.getElementById("installer-modal").showModal();
      }));
    } catch (error) { target.innerHTML = `<div class="empty-state error">${escapeHtml(error.message)}</div>`; }
    document.getElementById("installer-contact-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      try { await contactForEstimate(event.currentTarget.estimateId.value, { installerId: selectedInstaller, message: event.currentTarget.message.value }); showFeedback(document.getElementById("installer-feedback"), "Solicitud enviada al instalador.", "success"); }
      catch (error) { showFeedback(document.getElementById("installer-feedback"), error.message); }
    });
  }, 0);
  return `${Navbar()}<main class="app-page catalog-page"><header class="page-heading centered"><span class="badge-top">Red profesional</span><h1>Instaladores verificados</h1><p>Comparte tu cálculo con profesionales aprobados por SunWise.</p></header><section id="installer-grid" class="installer-grid">${LoadingState()}</section></main>${Modal({ id: "installer-modal", title: "Solicitar contacto", content: `<form id="installer-contact-form" class="app-form"><label class="form-field"><span>Cotización</span><select id="installer-estimate" name="estimateId"></select></label><label class="form-field"><span>Mensaje</span><textarea name="message" required>Quiero recibir una propuesta de instalación para esta cotización.</textarea></label><div id="installer-feedback"></div><button class="btn-primary" type="submit">Enviar solicitud</button></form>` })}${Footer()}`;
}
