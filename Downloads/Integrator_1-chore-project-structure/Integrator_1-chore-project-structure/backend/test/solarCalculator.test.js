import test from "node:test";
import assert from "node:assert/strict";
import { calculateSolarEstimate } from "../src/services/solarCalculator.js";

test("calcula protecciones dinámicas y paneles desde consumo mensual", () => {
  const result = calculateSolarEstimate({ inputMethod: "monthly_consumption", monthlyConsumptionKwh: 300, peakCoincidentPowerW: 2500, panelNominalPowerW: 550, panelIscA: 13.9, panelVocV: 49.9, efficiency: 0.78 }, 4.5);
  assert.equal(result.dailyConsumptionWh, 10000);
  assert.equal(result.panelCount, 6);
  assert.equal(result.dcBreakerA, 19.46);
  assert.equal(result.surgeProtectionVoltageV, 374.25);
  assert.equal(result.inverterPowerW, 3200);
});

test("rechaza consumo cero", () => {
  assert.throws(() => calculateSolarEstimate({ inputMethod: "monthly_consumption", monthlyConsumptionKwh: 0, peakCoincidentPowerW: 1000 }, 4.5), /mayor que cero/);
});
