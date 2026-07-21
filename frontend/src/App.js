import Router from "./routes/route.js";

export default function App() {
  Router();
  window.addEventListener("hashchange", Router);
}
