import Navbar, { initNavbar } from "../components/layout/navbar.js";
import LoadingState from "../components/common/loadingState.js";
import SummaryCard from "../components/dashboard/summaryCard.js";
import { getEstimate } from "../api/estimate.js";
import { escapeHtml, number } from "../utils/dom.js";

export default function Results({ query }) {
  setTimeout(async () => {
    initNavbar();
    const target = document.getElementById("result-content");
    try {
      const { estimate } = await getEstimate(query.get("id"));
      target.innerHTML = `<div class="summary-grid">${SummaryCard({ label: "Potencia del arreglo", value: `${number(estimate.arrayPowerWp, 0)} Wp`, icon: "☀" })}${SummaryCard({ label: "Paneles", value: `${estimate.panelCount} unidades`, icon: "▦" })}${SummaryCard({ label: "Inversor", value: `${number(estimate.inverterPowerW, 0)} W`, icon: "⚡" })}${SummaryCard({ label: "Banco de baterías", value: `${number(estimate.batteryBankAh, 0)} Ah`, icon: "▣" })}</div><section class="app-card result-tech"><h2>Protecciones calculadas</h2><div class="metric-list"><div><span>Corriente de diseño</span><strong>${number(estimate.designCurrentA, 2)} A</strong></div><div><span>Breaker CC (Isc × 1.4)</span><strong>${number(estimate.dcBreakerA, 2)} A</strong></div><div><span>DPS (Voc total × 1.25)</span><strong>${number(estimate.surgeProtectionVoltageV, 2)} V</strong></div></div></section><section class="app-card"><div class="section-row"><div><span class="badge-top">Receta técnica</span><h2>Materiales recomendados</h2></div><a class="btn-outline" href="#/installers">Contactar instalador</a></div><div class="recipe-grid">${estimate.materials.map((item) => `<article><span>${escapeHtml(item.category)}</span><h3>${escapeHtml(item.itemName)}</h3><strong>${number(item.quantity, 2)} ${escapeHtml(item.unit)}</strong><p>${escapeHtml(item.specification || "")}</p></article>`).join("")}</div></section>`;
    } catch (error) { target.innerHTML = `<div class="empty-state error">${escapeHtml(error.message)}</div>`; }
  }, 0);
  return `${Navbar()}<main class="app-page"><header class="page-heading"><span class="badge-top">Resultado guardado</span><h1>Tu sistema solar</h1><p>Dimensionamiento técnico calculado con los parámetros de tu proyecto.</p></header><div id="result-content">${LoadingState("Calculando presentación de resultados…")}</div></main>`;
}