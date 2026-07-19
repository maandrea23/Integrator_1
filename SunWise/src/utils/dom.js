export const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

export function showFeedback(element, message, type = "error") {
  if (!element) return;
  element.textContent = message;
  element.className = `form-feedback ${type}`;
}

export const money = (value) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value || 0));
export const number = (value, digits = 1) => new Intl.NumberFormat("es-CO", { maximumFractionDigits: digits }).format(Number(value || 0));
