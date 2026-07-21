export default function Modal({ id, title, content }) {
  return `<dialog id="${id}" class="app-modal"><div class="modal-head"><h2>${title}</h2><button class="icon-button" data-close-modal="${id}" aria-label="Cerrar">×</button></div>${content}</dialog>`;
}

export function initModals(root = document) {
  root.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.closeModal)?.close()));
}
