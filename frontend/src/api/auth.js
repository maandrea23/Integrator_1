import { request } from "./client.js";

export const login = (credentials) => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
export const register = (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) });
export const getCurrentUser = () => request("/auth/me");
