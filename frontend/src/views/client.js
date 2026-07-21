import DashboardShell from "../components/dashboard/dashboardShell.js";
import SummaryCard from "../components/dashboard/summaryCard.js";
import LoadingState from "../components/common/loadingState.js";
import { initNavbar } from "../components/layout/navbar.js";
import { getEstimates } from "../api/estimate.js";
import { getSessionUser } from "../services/authService.js";
import { number } from "../utils/dom.js";

export default function Client() {
  const user = getSessionUser();
  setTimeout(async () => {
    initNavbar();
    const target = document.getElementById("client-summary");
    try {
      const { estimates } = await getEstimates();
      const latest = estimates[0];
      target.innerHTML = `<div class="summary-grid">${SummaryCard({ label: "Cotizaciones", value: estimates.length, icon: "▤" })}${SummaryCard({ label: "Último consumo", value: latest ? `${number(latest.monthlyConsumptionKwh)} kWh` : "—", icon: "⚡" })}${SummaryCard({ label: "Paneles sugeridos", value: latest?.panelCount || "—", icon: "▦" })}</div><div class="quick-actions"><a class="action-card" href="#/wizard"><span>☀</span><div><h3>Nueva simulación</h3><p>Calcula otro escenario solar.</p></div></a><a class="action-card" href="#/history"><span>▤</span><div><h3>Ver historial</h3><p>Recupera recetas anteriores.</p></div></a><a class="action-card" href="#/marketplace"><span>◫</span><div><h3>Marketplace</h3><p>Explora materiales verificados.</p></div></a></div>`;
    } catch (error) { target.innerHTML = `<div class="empty-state error">${error.message}</div>`; }
  }, 0);
  return DashboardShell({ title: `Hola, ${escapeHtmlSafe(user?.name?.split(" ")[0] || "")}`, subtitle: "Aquí tienes el estado de tus proyectos solares.", content: `<div id="client-summary">${LoadingState()}</div>` });
}

function escapeHtmlSafe(value) { const node = document.createElement("div"); node.textContent = value; return node.innerHTML; }
