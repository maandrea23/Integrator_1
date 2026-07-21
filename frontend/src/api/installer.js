import { request } from "./client.js";

export const getInstallers = (city = "") => request(`/catalog/installers${city ? `?city=${encodeURIComponent(city)}` : ""}`);
export const getInstallerProfile = () => request("/installers/me");
export const updateInstallerProfile = (data) => request("/installers/me", { method: "PATCH", body: JSON.stringify(data) });
export const getInstallerContacts = () => request("/installers/contacts");
export const updateInstallerContact = (id, status) => request(`/installers/contacts/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
