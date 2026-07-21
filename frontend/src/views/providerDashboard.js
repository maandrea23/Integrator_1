import DashboardShell from "../components/dashboard/dashboardShell.js";
import SummaryCard from "../components/dashboard/summaryCard.js";
import DataTable from "../components/dashboard/dataTable.js";
import LoadingState from "../components/common/loadingState.js";
import { initNavbar } from "../components/layout/navbar.js";
import { createProduct, deleteProduct, getOwnProducts, getProviderContacts, getProviderProfile, updateProduct, updateProviderProfile } from "../api/provider.js";
import { escapeHtml, money, showFeedback } from "../utils/dom.js";

export default function ProviderDashboard() {
  let products = [];
  const load = async () => {
    const target = document.getElementById("provider-content");
    try {
      const [{ provider }, productPayload, contactPayload] = await Promise.all([getProviderProfile(), getOwnProducts(), getProviderContacts()]); products = productPayload.products;
      target.innerHTML = `<div class="summary-grid">${SummaryCard({ label: "Estado", value: provider.verificationStatus, icon: "✓" })}${SummaryCard({ label: "Calificación", value: `${provider.rating} / 5`, icon: "★" })}${SummaryCard({ label: "Productos", value: products.length, icon: "◫" })}${SummaryCard({ label: "Solicitudes", value: contactPayload.contacts.length, icon: "▤" })}</div><section class="app-card compact-profile"><form id="provider-profile-form" class="inline-form"><div class="inline-fields"><input name="storeName" value="${escapeHtml(provider.storeName)}" placeholder="Tienda" required><input name="city" value="${escapeHtml(provider.city)}" placeholder="Ciudad" required><input name="description" value="${escapeHtml(provider.description || "")}" placeholder="Descripción"></div><button class="btn-outline" type="submit">Actualizar tienda</button></form><div id="provider-profile-feedback"></div></section><div class="dashboard-columns provider-columns"><section class="app-card"><h2>Publicar producto</h2><form id="product-form" class="app-form"><input type="hidden" name="id"><label class="form-field"><span>Nombre</span><input name="name" required></label><label class="form-field"><span>Categoría</span><select name="category"><option value="panel">Panel</option><option value="inverter">Inversor</option><option value="battery">Batería</option><option value="cable">Cable</option><option value="protection">Protección</option></select></label><div class="form-grid"><label class="form-field"><span>Precio COP</span><input name="price" type="number" min="0" required></label><label class="form-field"><span>Stock</span><input name="stock" type="number" min="0" required></label></div><label class="form-field"><span>Descripción</span><textarea name="description"></textarea></label><div id="product-feedback"></div><button class="btn-primary" type="submit">Guardar producto</button></form></section><section class="app-card"><h2>Mis productos</h2><div id="own-products">${renderProducts()}</div></section></div>`;
      bindProductEvents();
      document.getElementById("provider-profile-form").addEventListener("submit", async (event) => { event.preventDefault(); try { await updateProviderProfile(Object.fromEntries(new FormData(event.currentTarget))); showFeedback(document.getElementById("provider-profile-feedback"), "Tienda actualizada.", "success"); } catch (error) { showFeedback(document.getElementById("provider-profile-feedback"), error.message); } });
    } catch (error) { target.innerHTML = `<div class="empty-state error">${escapeHtml(error.message)}</div>`; }
  };
  const renderProducts = () => DataTable({ headers: ["Producto", "Precio", "Stock", "Acciones"], rows: products.map((item) => `<tr><td><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)}</small></td><td>${money(item.price)}</td><td>${item.stock}</td><td><button class="table-link" data-edit-product="${item.id}">Editar</button><button class="table-link danger" data-delete-product="${item.id}">Eliminar</button></td></tr>`), empty: "Publica tu primer producto." });
  const bindProductEvents = () => {
    const form = document.getElementById("product-form");
    form.addEventListener("submit", async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); const id = data.id; delete data.id; try { if (id) await updateProduct(id, data); else await createProduct(data); await load(); } catch (error) { showFeedback(document.getElementById("product-feedback"), error.message); } });
    document.querySelectorAll("[data-edit-product]").forEach((button) => button.addEventListener("click", () => { const product = products.find((item) => item.id === Number(button.dataset.editProduct)); for (const [key, value] of Object.entries(product)) if (form.elements[key]) form.elements[key].value = value ?? ""; window.scrollTo({ top: form.offsetTop, behavior: "smooth" }); }));
    document.querySelectorAll("[data-delete-product]").forEach((button) => button.addEventListener("click", async () => { if (confirm("¿Eliminar este producto?")) { await deleteProduct(button.dataset.deleteProduct); await load(); } }));
  };
  setTimeout(() => { initNavbar(); load(); }, 0);
  return DashboardShell({ title: "Panel de proveedor", subtitle: "Administra tu catálogo y consulta el interés de clientes.", content: `<div id="provider-content">${LoadingState()}</div>` });
}
