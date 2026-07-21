export default function DataTable({ headers, rows, empty = "No hay registros todavía." }) {
  if (!rows.length) return `<div class="empty-state">${empty}</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
}
