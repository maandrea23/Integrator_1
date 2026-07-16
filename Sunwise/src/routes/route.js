import Home from "../views/home.js";
import Wizard from "../views/wizard.js";
import Marketplace from "../views/marketplace.js";
import Installers from "../views/installers.js";


const routes = {
  "/": Home,
  "/wizard": Wizard,
  "/marketplace": Marketplace,
  "/installers": Installers,
};

export default function Router() {
  const app = document.getElementById("app");
  const path = window.location.hash.slice(1) || "/";

  const page = routes[path];

  if (page) {
    app.innerHTML = page();
  } else {
    app.innerHTML = "<h1>Página no encontrada</h1>";
  }
}
