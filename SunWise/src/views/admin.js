import DashboardShell from "../components/dashboard/dashboardShell.js";
import SummaryCard from "../components/dashboard/summaryCard.js";
import DataTable from "../components/dashboard/dataTable.js";
import LoadingState from "../components/common/loadingState.js";
import { initNavbar } from "../components/layout/navbar.js";
import { createAdminItem, deleteAdminItem, getAdminItems, getAdminSummary, updateAdminItem } from "../api/admin.js";
import { escapeHtml, showFeedback } from "../utils/dom.js";

const roleOptions = [["user", "Usuario"], ["admin", "Administrador"], ["installer", "Instalador"], ["provider", "Proveedor"]];
const verificationOptions = [["pending", "Pendiente"], ["approved", "Aprobado"], ["rejected", "Rechazado"]];
const categoryOptions = [["panel", "Panel"], ["inverter", "Inversor"], ["battery", "Batería"], ["cable", "Cable"], ["protection", "Protección"]];
const recipeCategories = [...categoryOptions, ["structure", "Estructura"], ["other", "Otro"]];

const entityConfig = {
  installers: {
    label: "Instaladores",
    fields: [
      { name: "name", label: "Nombre responsable", required: true, source: "user" }, { name: "email", label: "Correo", type: "email", required: true, source: "user" },
      { name: "phone", label: "Teléfono", type: "tel", required: true, source: "user" }, { name: "password", label: "Contraseña", type: "password", createRequired: true },
      { name: "companyName", label: "Empresa", required: true }, { name: "city", label: "Ciudad", required: true }, { name: "certification", label: "Certificación" },
      { name: "bio", label: "Descripción", type: "textarea" }, { name: "verificationStatus", label: "Verificación", type: "select", options: verificationOptions, default: "pending" },
      { name: "rating", label: "Calificación", type: "number", min: 0, max: 5, step: .1, default: 0 }, { name: "available", label: "Disponible", type: "checkbox", default: true },
    ],
  },
  providers: {
    label: "Proveedores",
    fields: [
      { name: "name", label: "Nombre responsable", required: true, source: "user" }, { name: "email", label: "Correo", type: "email", required: true, source: "user" },
      { name: "phone", label: "Teléfono", type: "tel", required: true, source: "user" }, { name: "password", label: "Contraseña", type: "password", createRequired: true },
      { name: "storeName", label: "Tienda", required: true }, { name: "city", label: "Ciudad", required: true }, { name: "description", label: "Descripción", type: "textarea" },
      { name: "verificationStatus", label: "Verificación", type: "select", options: verificationOptions, default: "pending" }, { name: "rating", label: "Calificación", type: "number", min: 0, max: 5, step: .1, default: 0 },
    ],
  },
  products: {
    label: "Productos",
    fields: [
      { name: "providerId", label: "Proveedor", type: "providerSelect", required: true }, { name: "name", label: "Producto", required: true },
      { name: "category", label: "Categoría", type: "select", options: categoryOptions, required: true }, { name: "brand", label: "Marca" }, { name: "model", label: "Modelo" },
      { name: "price", label: "Precio COP", type: "number", min: 0, step: .01, required: true }, { name: "stock", label: "Existencias", type: "number", min: 0, step: 1, required: true },
      { name: "description", label: "Descripción", type: "textarea" }, { name: "isActive", label: "Publicado", type: "checkbox", default: true },
    ],
  },
  users: {
    label: "Usuarios",
    fields: [
      { name: "name", label: "Nombre", required: true }, { name: "email", label: "Correo", type: "email", required: true }, { name: "phone", label: "Teléfono", type: "tel", required: true },
      { name: "password", label: "Contraseña", type: "password", createRequired: true }, { name: "role", label: "Rol", type: "select", options: roleOptions, required: true, default: "user" },
      { name: "isActive", label: "Cuenta activa", type: "checkbox", default: true },
    ],
  },
  cities: { label: "Ciudades HSP", fields: [{ name: "city", label: "Ciudad", required: true }, { name: "department", label: "Departamento", required: true }, { name: "hsp", label: "HSP", type: "number", min: .01, step: .01, required: true }] },
  appliances: { label: "Electrodomésticos", fields: [{ name: "name", label: "Nombre", required: true }, { name: "standardPowerW", label: "Potencia estándar (W)", type: "number", min: .01, required: true }, { name: "defaultHoursPerDay", label: "Horas por día", type: "number", min: 0, step: .1, required: true }, { name: "coincidenceFactor", label: "Factor de coincidencia", type: "number", min: 0, max: 1, step: .01, required: true }] },
  materials: { label: "Materiales", fields: [{ name: "estimateId", label: "ID cotización", type: "number", min: 1, required: true }, { name: "category", label: "Categoría", type: "select", options: recipeCategories, required: true }, { name: "itemName", label: "Material", required: true }, { name: "quantity", label: "Cantidad", type: "number", min: .01, step: .01, required: true }, { name: "unit", label: "Unidad", required: true }, { name: "specification", label: "Especificación", type: "textarea" }] },
  estimates: { label: "Cotizaciones", createDisabled: true, fields: [{ name: "status", label: "Estado", type: "select", options: [["draft", "Borrador"], ["completed", "Completada"], ["archived", "Archivada"]], required: true }] },
};

const text = (value) => escapeHtml(value ?? "—");

export default function Admin() {
  let current = "installers";
  let currentItems = [];
  let providers = [];

  const feedback = (message, type = "error") => showFeedback(document.getElementById("admin-feedback"), message, type);

  const loadSummary = async () => {
    try {
      const { summary } = await getAdminSummary();
      document.getElementById("admin-summary").innerHTML = [
        SummaryCard({ label: "Usuarios", value: summary.users, icon: "♙" }), SummaryCard({ label: "Instaladores pendientes", value: summary.installersPending, icon: "⌂" }),
        SummaryCard({ label: "Proveedores pendientes", value: summary.providersPending, icon: "◫" }), SummaryCard({ label: "Cotizaciones", value: summary.estimates, icon: "▤" }),
      ].join("");
    } catch (error) { feedback(error.message); }
  };

  const itemDescription = (item) => {
    const main = item.name || item.companyName || item.storeName || item.itemName || item.city || `Cotización #${item.id}`;
    const detail = item.email || item.user?.email || item.provider?.storeName || item.department || item.category || `${item.monthlyConsumptionKwh || ""} kWh`;
    const status = item.verificationStatus || item.status || (item.isActive === false ? "inactivo" : "activo");
    return { main, detail, status };
  };

  const runAction = async (action, successMessage) => {
    try { await action(); feedback(successMessage, "success"); await Promise.all([loadItems(), loadSummary()]); }
    catch (error) { feedback(error.details?.join(". ") || error.message); }
  };

  const loadItems = async () => {
    const target = document.getElementById("admin-table");
    target.innerHTML = LoadingState();
    try {
      const payload = await getAdminItems(current);
      currentItems = payload.items || payload.estimates || [];
      const rows = currentItems.map((item) => {
        const { main, detail, status } = itemDescription(item);
        const verification = ["installers", "providers"].includes(current)
          ? `<button class="table-link" data-status="approved" data-id="${item.id}">Aprobar</button><button class="table-link danger" data-status="rejected" data-id="${item.id}">Rechazar</button>` : "";
        return `<tr><td>#${item.id}</td><td><strong>${text(main)}</strong><small>${text(detail)}</small></td><td><span class="status-badge ${text(status)}">${text(status)}</span></td><td>${verification}<button class="table-link" data-edit="${item.id}">Editar</button><button class="table-link danger" data-delete="${item.id}">Eliminar</button></td></tr>`;
      });
      target.innerHTML = DataTable({ headers: ["ID", "Registro", "Estado", "Acciones"], rows, empty: `No hay ${entityConfig[current].label.toLowerCase()} registrados.` });
      target.querySelectorAll("[data-status]").forEach((button) => button.addEventListener("click", () => runAction(() => updateAdminItem(current, button.dataset.id, { verificationStatus: button.dataset.status }), "Estado actualizado.")));
      target.querySelectorAll("[data-edit]").forEach((button) => button.addEventListener("click", () => openForm("edit", currentItems.find((item) => item.id === Number(button.dataset.edit)))));
      target.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => { if (confirm("¿Eliminar este registro definitivamente?")) runAction(() => deleteAdminItem(current, button.dataset.delete), "Registro eliminado."); }));
    } catch (error) { target.innerHTML = `<div class="empty-state error">${text(error.message)}</div>`; }
  };

  const valueFor = (field, item) => field.source === "user" ? item?.user?.[field.name] : item?.[field.name];

  const renderField = (field, item, mode) => {
    const rawValue = valueFor(field, item);
    const value = rawValue ?? field.default ?? "";
    const required = field.required || (mode === "create" && field.createRequired);
    if (field.type === "checkbox") return `<label class="switch-field admin-switch"><input type="checkbox" name="${field.name}" ${(rawValue ?? field.default) ? "checked" : ""}><span>${field.label}</span></label>`;
    let control;
    if (field.type === "textarea") control = `<textarea name="${field.name}" ${required ? "required" : ""}>${text(value)}</textarea>`;
    else if (["select", "providerSelect"].includes(field.type)) {
      const options = field.type === "providerSelect" ? providers.map((provider) => [String(provider.id), provider.storeName]) : field.options;
      control = `<select name="${field.name}" ${required ? "required" : ""}><option value="">Selecciona…</option>${options.map(([optionValue, label]) => `<option value="${text(optionValue)}" ${String(optionValue) === String(value) ? "selected" : ""}>${text(label)}</option>`).join("")}</select>`;
    } else control = `<input name="${field.name}" type="${field.type || "text"}" value="${text(value)}" ${required ? "required" : ""} ${field.min !== undefined ? `min="${field.min}"` : ""} ${field.max !== undefined ? `max="${field.max}"` : ""} ${field.step !== undefined ? `step="${field.step}"` : ""}>`;
    return `<label class="form-field"><span>${field.label}${required ? " *" : ""}</span>${control}</label>`;
  };

  const openForm = async (mode, item = null) => {
    if (current === "products" && !providers.length) {
      const payload = await getAdminItems("providers"); providers = payload.items;
    }
    const form = document.getElementById("admin-entity-form");
    form.dataset.mode = mode; form.dataset.entity = current; form.dataset.id = item?.id || "";
    document.getElementById("admin-modal-title").textContent = `${mode === "create" ? "Crear" : "Editar"} ${entityConfig[current].label.toLowerCase()}`;
    form.querySelector(".admin-form-fields").innerHTML = entityConfig[current].fields.map((field) => renderField(field, item, mode)).join("");
    document.getElementById("admin-modal-feedback").textContent = "";
    document.getElementById("admin-entity-modal").showModal();
  };

  const normalizeForm = (form, config) => {
    const data = Object.fromEntries(new FormData(form));
    config.fields.filter((field) => field.type === "checkbox").forEach((field) => { data[field.name] = form.elements[field.name].checked; });
    if (!data.password) delete data.password;
    return data;
  };

  setTimeout(async () => {
    initNavbar();
    await Promise.all([loadSummary(), loadItems()]);
    const createButton = document.getElementById("admin-open-create");
    const syncCreateButton = () => { createButton.hidden = Boolean(entityConfig[current].createDisabled); createButton.textContent = `Crear ${entityConfig[current].label.toLowerCase()}`; };
    syncCreateButton();
    document.getElementById("admin-tabs").addEventListener("click", async (event) => {
      const button = event.target.closest("[data-entity]"); if (!button) return;
      current = button.dataset.entity;
      document.querySelectorAll("[data-entity]").forEach((tab) => tab.classList.toggle("active", tab === button));
      syncCreateButton(); document.getElementById("admin-feedback").textContent = ""; await loadItems();
    });
    createButton.addEventListener("click", () => openForm("create"));
    document.getElementById("close-admin-entity").addEventListener("click", () => document.getElementById("admin-entity-modal").close());
    document.getElementById("admin-entity-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget; const entity = form.dataset.entity; const config = entityConfig[entity]; const data = normalizeForm(form, config);
      const button = form.querySelector("button[type=submit]"); button.disabled = true;
      try {
        if (form.dataset.mode === "create") await createAdminItem(entity, data); else await updateAdminItem(entity, form.dataset.id, data);
        document.getElementById("admin-entity-modal").close(); feedback("Registro guardado correctamente.", "success"); await Promise.all([loadItems(), loadSummary()]);
      } catch (error) { showFeedback(document.getElementById("admin-modal-feedback"), error.details?.join(". ") || error.message); }
      finally { button.disabled = false; }
    });
  }, 0);

  return DashboardShell({
    title: "Centro de administración",
    subtitle: "Gestiona cuentas, verificaciones, catálogo técnico y cotizaciones.",
    content: `<div id="admin-summary" class="summary-grid">${LoadingState()}</div><section class="app-card admin-manager"><nav id="admin-tabs" class="dashboard-tabs">${Object.entries(entityConfig).map(([key, config], index) => `<button class="${index === 0 ? "active" : ""}" data-entity="${key}">${config.label}</button>`).join("")}</nav><div class="admin-toolbar"><div id="admin-feedback" aria-live="polite"></div><button id="admin-open-create" class="btn-primary" type="button">Crear</button></div><div id="admin-table">${LoadingState()}</div></section><dialog id="admin-entity-modal" class="app-modal admin-entity-modal"><div class="modal-head"><h2 id="admin-modal-title">Gestionar registro</h2><button id="close-admin-entity" class="icon-button" type="button">×</button></div><form id="admin-entity-form" class="app-form"><div class="admin-form-fields form-grid"></div><div id="admin-modal-feedback" class="full-field"></div><button class="btn-primary full-field" type="submit">Guardar cambios</button></form></dialog>`,
  });
}
