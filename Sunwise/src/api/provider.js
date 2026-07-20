import { request } from "./client.js";

export const getProducts = (category = "") => request(`/catalog/products${category ? `?category=${encodeURIComponent(category)}` : ""}`);
export const getProviderProfile = () => request("/providers/me");
export const updateProviderProfile = (data) => request("/providers/me", { method: "PATCH", body: JSON.stringify(data) });
export const getOwnProducts = () => request("/providers/products");
export const createProduct = (data) => request("/providers/products", { method: "POST", body: JSON.stringify(data) });
export const updateProduct = (id, data) => request(`/providers/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteProduct = (id) => request(`/providers/products/${id}`, { method: "DELETE" });
export const getProviderContacts = () => request("/providers/contacts");
