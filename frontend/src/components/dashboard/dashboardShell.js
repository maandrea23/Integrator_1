import Navbar from "../layout/navbar.js";
import { getSessionUser } from "../../services/authService.js";

const labels = { user: "Mi energía", admin: "Administración", installer: "Panel instalador", provider: "Panel proveedor" };

export default function DashboardShell({ title, subtitle, content }) {
  const user = getSessionUser();
  return `${Navbar()}<main class="app-page dashboard-page"><header class="page-heading"><span class="badge-top">${labels[user?.role] || "SunWise"}</span><h1>${title}</h1><p>${subtitle}</p></header>${content}</main>`;
}
