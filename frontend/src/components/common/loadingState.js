export default function LoadingState(message = "Cargando información…") {
  return `<div class="loading-state"><span class="loader"></span><p>${message}</p></div>`;
}
