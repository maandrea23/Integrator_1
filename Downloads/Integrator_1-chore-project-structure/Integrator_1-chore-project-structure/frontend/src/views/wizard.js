import Navbar, { initNavbar } from "../components/layout/navbar.js";
import { createEstimate, getAppliances, getCities } from "../api/estimate.js";
import { isAuthenticated } from "../services/authService.js";
import { escapeHtml, showFeedback } from "../utils/dom.js";

export default function Wizard() {
  setTimeout(async () => {
    initNavbar();
    const form = document.getElementById("estimate-form");
    const citySelect = document.getElementById("cityHspId");
    const applianceList = document.getElementById("appliance-list");
    try {
      const [{ cities }, { appliances }] = await Promise.all([getCities(), getAppliances()]);
      citySelect.innerHTML = `<option value="">Selecciona tu ciudad</option>${cities.map((city) => `<option value="${city.id}">${escapeHtml(city.city)} — ${city.hsp} HSP</option>`).join("")}`;
      applianceList.innerHTML = appliances.map((item) => `<label class="appliance-row"><input type="checkbox" data-appliance-id="${item.id}" data-power="${item.standardPowerW}" data-coincidence="${item.coincidenceFactor}"><span>${escapeHtml(item.name)} <small>${item.standardPowerW} W</small></span><input class="quantity" type="number" min="1" value="1" aria-label="Cantidad"><input class="hours" type="number" min="0.1" step="0.1" value="${item.defaultHoursPerDay}" aria-label="Horas por día"></label>`).join("");
    } catch (error) { showFeedback(document.getElementById("wizard-feedback"), error.message); }
    document.querySelectorAll("[name=inputMethod]").forEach((radio) => radio.addEventListener("change", () => {
      const inventory = radio.value === "appliances" && radio.checked;
      document.getElementById("consumption-fields").hidden = inventory;
      document.getElementById("inventory-fields").hidden = !inventory;
    }));
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!isAuthenticated()) { sessionStorage.setItem("sunwise_return", "/wizard"); window.location.hash = "/login"; return; }
      const data = Object.fromEntries(new FormData(form));
      if (data.inputMethod === "appliances") data.appliances = [...document.querySelectorAll(".appliance-row")].filter((row) => row.querySelector("[type=checkbox]").checked).map((row) => ({ applianceId: Number(row.querySelector("[type=checkbox]").dataset.applianceId), powerW: Number(row.querySelector("[type=checkbox]").dataset.power), coincidenceFactor: Number(row.querySelector("[type=checkbox]").dataset.coincidence), quantity: Number(row.querySelector(".quantity").value), hoursPerDay: Number(row.querySelector(".hours").value) }));
      try {
        const { estimate } = await createEstimate(data);
        window.location.hash = `/results?id=${estimate.id}`;
      } catch (error) { showFeedback(document.getElementById("wizard-feedback"), error.details?.join(". ") || error.message); }
    });
  }, 0);
  return `${Navbar()}<main class="app-page wizard-page"><header class="page-heading centered"><span class="badge-top">Cálculo técnico</span><h1>Dimensiona tu sistema</h1><p>Elige el camino que mejor describe la información que tienes.</p></header><form id="estimate-form" class="wizard-card"><div class="method-selector"><label><input type="radio" name="inputMethod" value="monthly_consumption" checked><strong>Conozco mi consumo</strong><span>Usa los kWh de tu factura.</span></label><label><input type="radio" name="inputMethod" value="appliances"><strong>Inventario de equipos</strong><span>Estimamos desde tus cargas.</span></label></div><div class="form-grid"><label class="form-field"><span>Ciudad *</span><select id="cityHspId" name="cityHspId" required><option>Cargando…</option></select></label><label class="form-field"><span>Eficiencia global</span><input name="efficiency" type="number" min="0.75" max="0.80" step="0.01" value="0.78"></label></div><section id="consumption-fields" class="form-grid"><label class="form-field"><span>Consumo mensual (kWh) *</span><input name="monthlyConsumptionKwh" type="number" min="0.01" step="0.01" value="300"></label><label class="form-field"><span>Potencia coincidente pico (W) *</span><input name="peakCoincidentPowerW" type="number" min="1" value="2500"></label></section><section id="inventory-fields" hidden><div class="appliance-head"><strong>Equipo</strong><span>Cantidad · Horas/día</span></div><div id="appliance-list"></div></section><details class="technical-details"><summary>Parámetros técnicos</summary><div class="form-grid"><label class="form-field"><span>Panel nominal (W)</span><input name="panelNominalPowerW" type="number" min="1" value="550"></label><label class="form-field"><span>Isc del panel (A)</span><input name="panelIscA" type="number" min="0.01" step="0.01" value="13.9"></label><label class="form-field"><span>Voc del panel (V)</span><input name="panelVocV" type="number" min="0.01" step="0.01" value="49.9"></label><label class="form-field"><span>Voltaje del sistema (V)</span><input name="systemVoltageV" type="number" min="1" value="48"></label><label class="form-field"><span>Días de autonomía</span><input name="autonomyDays" type="number" min="0.1" step="0.1" value="1"></label><label class="form-field"><span>DOD batería</span><input name="batteryDod" type="number" min="0.1" max="1" step="0.1" value="0.8"></label></div></details><div id="wizard-feedback" aria-live="polite"></div><button class="btn-primary big" type="submit">Calcular sistema →</button></form></main>`;
}
