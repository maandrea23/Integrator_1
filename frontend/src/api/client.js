const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
// In development Vite proxies this path to the local API. In a published build it
// can either be served by a reverse proxy at the same origin or be overridden
// with VITE_API_URL at build time. A browser must never try to reach the
// deployer's localhost.
const API_URL = (configuredApiUrl || "/api").replace(/\/$/, "");

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function apiConfigurationError() {
  const setupHint = configuredApiUrl
    ? "Verifica que la API publicada esté disponible y acepte solicitudes desde este sitio."
    : "Configura VITE_API_URL con la URL pública de la API y vuelve a desplegar el frontend.";
  const error = new Error(`No se pudo conectar con la API (${API_URL}). ${setupHint}`);
  error.code = "API_UNREACHABLE";
  return error;
}

async function fetchWithRetry(url, options) {
  try {
    return await fetch(url, options);
  } catch (firstError) {
    await wait(500);
    try {
      return await fetch(url, options);
    } catch {
      const error = apiConfigurationError();
      error.cause = firstError;
      throw error;
    }
  }
}

export async function request(path, options = {}) {
  const token = localStorage.getItem("sunwise_token");
  const response = await fetchWithRetry(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  if (response.status !== 204 && !isJson) {
    // Netlify's SPA redirect returns index.html (HTTP 200) for /api when no
    // backend URL is configured. Treat it as a connection/configuration error.
    throw apiConfigurationError();
  }

  const data = response.status === 204 ? null : await response.json().catch(() => {
    throw apiConfigurationError();
  });
  if (!response.ok) {
    const error = new Error(data?.error || "No fue posible completar la solicitud");
    error.status = response.status;
    error.details = data?.details;
    if (response.status === 401) localStorage.removeItem("sunwise_token");
    throw error;
  }
  return data;
}

export const apiUrl = API_URL;
