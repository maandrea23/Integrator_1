export default function SummaryCard({ label, value, icon = "☀" }) {
  return `<article class="summary-card"><span class="summary-icon">${icon}</span><div><p>${label}</p><strong>${value}</strong></div></article>`;
}
