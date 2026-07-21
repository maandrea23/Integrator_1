import { request } from "./client.js";

export const updateProfile = (data) => request("/users/me", { method: "PATCH", body: JSON.stringify(data) });
export const deleteAccount = () => request("/users/me", { method: "DELETE" });
