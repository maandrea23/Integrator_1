import { request } from "./client.js";

export const getAdminSummary = () => request("/admin/dashboard");
export const getAdminItems = (entity) => request(`/admin/${entity}`);
export const createAdminItem = (entity, data) => request(`/admin/${entity}`, { method: "POST", body: JSON.stringify(data) });
export const updateAdminItem = (entity, id, data) => request(`/admin/${entity}/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteAdminItem = (entity, id) => request(`/admin/${entity}/${id}`, { method: "DELETE" });
