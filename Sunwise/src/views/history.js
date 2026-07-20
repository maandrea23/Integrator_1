import DashboardShell from "../components/dashboard/dashboardShell.js";
import LoadingState from "../components/common/loadingState.js";
import DataTable from "../components/dashboard/dataTable.js";
import { initNavbar } from "../components/layout/navbar.js";
import { deleteEstimate, getEstimates } from "../api/estimate.js";
import { number } from "../utils/dom.js";

export default function History() {
  const load = async () => {
    const target = document.getElementById("history-content");
    try {
      const { estimates } = await getEstimates();
      target.innerHTML = DataTable({ headers: ["Fecha", "Ciudad", "Consumo", "Paneles", "Estado", "Acciones"], rows: estimates.map((item) => `<tr><td>${new Date(item.createdAt).toLocaleDateString("es-CO")}</td><td>${item.cityHsp.city}</td><td>${number(item.monthlyConsumptionKwh)} kWh</td><td>${item.panelCount}</td><td><span class="status-badge ${item.status}">${item.status}</span></td><td><a href="#/results?id=${item.id}" class="table-link">Ver</a><button class="table-link danger" data-delete-estimate="${item.id}">Eliminar</button></td></tr>`), empty: "Aún no has generado cotizaciones." });
      target.querySelectorAll("[data-delete-estimate]").forEach((button) => button.addEventListener("click", async () => { if (confirm("¿Eliminar esta cotización?")) { await deleteEstimate(button.dataset.deleteEstimate); await load(); } }));
    } catch (error) { target.innerHTML = `<div class="empty-state error">${error.message}</div>`; }
  };
  setTimeout(() => { initNavbar(); load(); }, 0);
  return DashboardShell({ title: "Historial de cotizaciones", subtitle: "Consulta cada cálculo y su receta de materiales.", content: `<div id="history-content">${LoadingState()}</div>` });
}
