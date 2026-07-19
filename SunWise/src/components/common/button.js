export default function Button({ text, type = "button", variant = "primary", id = "", className = "" }) {
  return `<button ${id ? `id="${id}"` : ""} type="${type}" class="btn-${variant} ${className}">${text}</button>`;
}
