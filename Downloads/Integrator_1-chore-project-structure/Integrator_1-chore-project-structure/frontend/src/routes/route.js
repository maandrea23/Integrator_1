import Home from "../views/home.js";
import Wizard from "../views/wizard.js";
import Marketplace from "../views/marketplace.js";
import Installers from "../views/installers.js";
import Login from "../views/login.js";
import Register from "../views/register.js";
import Client from "../views/client.js";
import History from "../views/history.js";
import Profile from "../views/profile.js";
import Results from "../views/results.js";
import Admin from "../views/admin.js";
import InstallerDashboard from "../views/installerDashboard.js";
import ProviderDashboard from "../views/providerDashboard.js";
import NotFound from "../views/notFound.js";
import { dashboardPath, getSessionUser, isAuthenticated } from "../services/authService.js";

const routes = {
  "/": Home, "/wizard": Wizard, "/marketplace": Marketplace, "/installers": Installers,
  "/login": Login, "/register": Register, "/dashboard": Client, "/history": History,
  "/profile": Profile, "/results": Results, "/admin": Admin,
  "/installer": InstallerDashboard, "/provider": ProviderDashboard,
};

const protectedRoutes = {
  "/dashboard": ["user"], "/history": ["user"], "/profile": ["user", "installer", "provider", "admin"],
  "/results": ["user", "admin"], "/admin": ["admin"], "/installer": ["installer"], "/provider": ["provider"],
};

export default function Router() {
  const app = document.getElementById("app");
  const hash = window.location.hash.slice(1) || "/";
  const [path, search = ""] = hash.split("?");
  if (protectedRoutes[path]) {
    const user = getSessionUser();
    if (!isAuthenticated() || !user) { window.location.hash = "/login"; return; }
    if (!protectedRoutes[path].includes(user.role)) { window.location.hash = dashboardPath(user.role); return; }
  }
  if (["/login", "/register"].includes(path) && isAuthenticated()) { window.location.hash = dashboardPath(); return; }
  const page = routes[path] || NotFound;
  app.innerHTML = page({ path, query: new URLSearchParams(search) });
  window.scrollTo({ top: 0 });
}
