export default function Input({ id, name = id, label, type = "text", value = "", required = false, min, max, step, placeholder = "" }) {
  return `<label class="form-field" for="${id}"><span>${label}${required ? " *" : ""}</span><input id="${id}" name="${name}" type="${type}" value="${value}" placeholder="${placeholder}" ${required ? "required" : ""} ${min !== undefined ? `min="${min}"` : ""} ${max !== undefined ? `max="${max}"` : ""} ${step !== undefined ? `step="${step}"` : ""}></label>`;
}
