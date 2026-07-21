import ApiError from "../utils/ApiError.js";

const positive = (value, field) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) throw new ApiError(422, `${field} debe ser mayor que cero`);
  return number;
};

export function calculateSolarEstimate(input, hsp) {
  const efficiency = Number(input.efficiency ?? 0.78);
  if (efficiency < 0.75 || efficiency > 0.8) throw new ApiError(422, "efficiency debe estar entre 0.75 y 0.80");
  let monthlyConsumptionKwh;
  let peakCoincidentPowerW;
  const appliances = Array.isArray(input.appliances) ? input.appliances : [];

  if (input.inputMethod === "appliances") {
    if (!appliances.length) throw new ApiError(422, "Debes incluir al menos un electrodoméstico");
    const dailyWh = appliances.reduce((sum, item) => sum + positive(item.powerW, "powerW") * positive(item.quantity ?? 1, "quantity") * positive(item.hoursPerDay, "hoursPerDay"), 0);
    monthlyConsumptionKwh = dailyWh * 30 / 1000;
    peakCoincidentPowerW = appliances.reduce((sum, item) => sum + Number(item.powerW) * Number(item.quantity ?? 1) * Number(item.coincidenceFactor ?? 1), 0);
  } else {
    monthlyConsumptionKwh = positive(input.monthlyConsumptionKwh, "monthlyConsumptionKwh");
    peakCoincidentPowerW = positive(input.peakCoincidentPowerW, "peakCoincidentPowerW");
  }

  const dailyConsumptionWh = monthlyConsumptionKwh * 1000 / 30;
  const panelNominalPowerW = positive(input.panelNominalPowerW ?? 550, "panelNominalPowerW");
  const panelIscA = positive(input.panelIscA ?? 13.9, "panelIscA");
  const panelVocV = positive(input.panelVocV ?? 49.9, "panelVocV");
  const systemVoltageV = positive(input.systemVoltageV ?? 48, "systemVoltageV");
  const autonomyDays = positive(input.autonomyDays ?? 1, "autonomyDays");
  const batteryDod = Number(input.batteryDod ?? 0.8);
  if (batteryDod <= 0 || batteryDod > 1) throw new ApiError(422, "batteryDod debe estar entre 0 y 1");
  const arrayPowerWp = dailyConsumptionWh / (positive(hsp, "hsp") * efficiency);
  const panelCount = Math.ceil(arrayPowerWp / panelNominalPowerW);
  const panelsInSeries = Math.min(panelCount, Math.max(1, Math.floor(Number(input.maxMpptVoltageV ?? 500) / panelVocV)));
  const inverterPowerW = Math.ceil((peakCoincidentPowerW * 1.25) / 100) * 100;
  const batteryBankAh = dailyConsumptionWh * autonomyDays / (systemVoltageV * batteryDod);
  const designCurrentA = panelIscA * 1.25;
  const dcBreakerA = panelIscA * 1.4;
  const surgeProtectionVoltageV = panelVocV * panelsInSeries * 1.25;

  return {
    inputMethod: input.inputMethod === "appliances" ? "appliances" : "monthly_consumption",
    monthlyConsumptionKwh, dailyConsumptionWh, efficiency, panelNominalPowerW, panelIscA, panelVocV,
    panelsInSeries, arrayPowerWp, panelCount, peakCoincidentPowerW, inverterPowerW, systemVoltageV,
    autonomyDays, batteryDod, batteryBankAh, designCurrentA, dcBreakerA, surgeProtectionVoltageV,
    applianceSnapshot: appliances,
  };
}

export function buildRecipe(result) {
  return [
    { category: "panel", itemName: "Panel solar fotovoltaico", quantity: result.panelCount, unit: "unidad", specification: `${result.panelNominalPowerW} Wp; Isc ${result.panelIscA} A; Voc ${result.panelVocV} V` },
    { category: "inverter", itemName: "Inversor solar", quantity: 1, unit: "unidad", specification: `Potencia mínima ${result.inverterPowerW} W por carga coincidente` },
    { category: "battery", itemName: "Banco de baterías", quantity: result.batteryBankAh, unit: "Ah", specification: `${result.systemVoltageV} V; DOD ${Math.round(result.batteryDod * 100)}%` },
    { category: "protection", itemName: "Breaker CC", quantity: 1, unit: "unidad", specification: `Mínimo ${result.dcBreakerA.toFixed(2)} A (Isc × 1.4)` },
    { category: "protection", itemName: "DPS CC", quantity: 1, unit: "unidad", specification: `Mínimo ${result.surgeProtectionVoltageV.toFixed(2)} V (Voc total × 1.25)` },
    { category: "cable", itemName: "Cable solar", quantity: 1, unit: "lote", specification: `Corriente de diseño ${result.designCurrentA.toFixed(2)} A` },
    { category: "structure", itemName: "Estructura de montaje", quantity: result.panelCount, unit: "módulo", specification: "Compatible con panel seleccionado" },
  ];
}
