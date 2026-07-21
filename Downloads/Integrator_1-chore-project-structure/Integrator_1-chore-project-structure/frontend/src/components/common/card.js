export default function Card({ title = "", content = "", className = "" }) {
  return `<article class="app-card ${className}">${title ? `<h3>${title}</h3>` : ""}${content}</article>`;
}
