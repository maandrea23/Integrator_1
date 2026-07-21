import Navbar, { initNavbar } from "../components/layout/navbar.js";
import Footer from "../components/layout/footer.js";
import LoadingState from "../components/common/loadingState.js";
import Modal, { initModals } from "../components/common/modal.js";
import { getProducts } from "../api/provider.js";
import { contactForEstimate, getEstimates } from "../api/estimate.js";
import { getSessionUser, isAuthenticated } from "../services/authService.js";
import { escapeHtml, money, showFeedback } from "../utils/dom.js";

const categoryImages = {
  panel: "https://cdn.autosolar.co/images/1002071/panel-solar-550w-24v-monocristalino-perc-ecogreen-thumb.jpg",
  inverter: "https://www.emergente.com.co/wp-content/uploads/2024/11/Inversor-On-Grid-Solis-Trifasico-5kW-220V.webp",
  battery: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP61SvwIK9KYWjUxEfty1NIVZ53A6o_NUkRl2DNLGm9w&s=10",
  cable: "https://solphower.co/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MTg0ODYxNCwicHVyIjoiYmxvYl9pZCJ9fQ==--38c498d8a27f9fbf0a8da7930b9109fe4228d796/4.jpg?locale=es",
  protection: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdsTDH_5qlWGzGjdQcXlOFi-wfG6fxONmam7jXJCEYng&s=10"
};

export default function Marketplace() {
  let selectedProvider = null;
  const load = async (category = "") => {
    const target = document.getElementById("product-grid");
    target.innerHTML = LoadingState();
    try {
      const { products } = await getProducts(category);
      target.innerHTML = products.length ? products.map((product) => `<article class="product-card"><div class="product-visual">
      <img src="${categoryImages[product.category]}"
          alt="${escapeHtml(product.name)}"
          class="product-image""></div><span class="product-category">${escapeHtml(product.category)}</span><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description || `${product.brand || ""} ${product.model || ""}`)}</p><div class="product-bottom"><strong>${money(product.price)}</strong><small>${product.stock} disponibles</small></div><div class="provider-line"><span>${escapeHtml(product.provider.storeName)} · ★ ${product.provider.rating}</span><button class="btn-outline" data-contact-provider="${product.provider.id}">Contactar</button></div></article>`).join("") : `<div class="empty-state">No hay productos en esta categoría.</div>`;
      target.querySelectorAll("[data-contact-provider]").forEach((button) => button.addEventListener("click", async () => {
        if (!isAuthenticated() || getSessionUser()?.role !== "user") { window.location.hash = "/login"; return; }
        selectedProvider = Number(button.dataset.contactProvider);
        const { estimates } = await getEstimates();
        document.getElementById("contact-estimate").innerHTML = estimates.map((item) => `<option value="${item.id}">Cotización #${item.id} · ${item.cityHsp.city}</option>`).join("");
        document.getElementById("contact-modal").showModal();
      }));
    } catch (error) { target.innerHTML = `<div class="empty-state error">${escapeHtml(error.message)}</div>`; }
  };
  setTimeout(() => {
    initNavbar(); initModals(); load();
    document.getElementById("category-filter")?.addEventListener("change", (event) => load(event.target.value));
    document.getElementById("contact-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      try { await contactForEstimate(event.currentTarget.estimateId.value, { providerId: selectedProvider, message: event.currentTarget.message.value }); showFeedback(document.getElementById("contact-feedback"), "Solicitud enviada al proveedor.", "success"); }
      catch (error) { showFeedback(document.getElementById("contact-feedback"), error.message); }
    });
  }, 0);
  return `${Navbar()}<main class="app-page catalog-page"><header class="page-heading"><span class="badge-top">Proveedores verificados</span><h1>Marketplace solar</h1><p>Encuentra equipos y materiales publicados por tiendas aprobadas.</p></header><div class="catalog-toolbar"><label>Filtrar por categoría <select id="category-filter"><option value="">Todos</option><option value="panel">Paneles</option><option value="inverter">Inversores</option><option value="battery">Baterías</option><option value="cable">Cables</option><option value="protection">Protecciones</option></select></label></div><section id="product-grid" class="product-grid">${LoadingState()}</section></main>${Modal({ id: "contact-modal", title: "Contactar proveedor", content: `<form id="contact-form" class="app-form"><label class="form-field"><span>Cotización</span><select id="contact-estimate" name="estimateId"></select></label><label class="form-field"><span>Mensaje</span><textarea name="message" required>Quiero información y disponibilidad para los materiales de mi cotización.</textarea></label><div id="contact-feedback"></div><button class="btn-primary" type="submit">Enviar solicitud</button></form>` })}${Footer()}`;
}
