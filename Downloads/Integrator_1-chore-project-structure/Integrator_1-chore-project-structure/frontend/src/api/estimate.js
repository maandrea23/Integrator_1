import { request } from "./client.js";

export const createEstimate = (data) => request("/estimates", { method: "POST", body: JSON.stringify(data) });
export const getEstimates = () => request("/estimates");
export const getEstimate = (id) => request(`/estimates/${id}`);
export const updateEstimate = (id, data) => request(`/estimates/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteEstimate = (id) => request(`/estimates/${id}`, { method: "DELETE" });
export const contactForEstimate = (id, data) => request(`/estimates/${id}/contacts`, { method: "POST", body: JSON.stringify(data) });
export const getCities = () => request("/catalog/cities");
export const getAppliances = () => request("/catalog/appliances");
