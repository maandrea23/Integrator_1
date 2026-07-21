const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = (configuredApiUrl || (import.meta.env.DEV ? "/api" : "http://localhost:3000/api")).replace(/\/$/, "");

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, options) {
  try {
    return await fetch(url, options);
  } catch (firstError) {
    await wait(500);
    try {
      return await fetch(url, options);
    } catch {
      const error = new Error(`No se pudo conectar con la API (${API_URL}). Inicia el proyecto desde Integrator_1 con "npm run dev".`);
      error.code = "API_UNREACHABLE";
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

  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
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
