import { Provider, Product, User, QuoteContact, Estimate, MaterialRecipe } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const getOwn = (userId, options = {}) => Provider.findOne({ where: { userId }, ...options });

export async function getProfile(req, res) {
  const provider = await getOwn(req.auth.userId, { include: [{ model: User, as: "user", attributes: { exclude: ["passwordHash"] } }] });
  if (!provider) throw new ApiError(404, "Perfil de proveedor no encontrado");
  res.json({ provider });
}

export async function updateProfile(req, res) {
  const provider = await getOwn(req.auth.userId);
  if (!provider) throw new ApiError(404, "Perfil de proveedor no encontrado");
  const values = {};
  for (const field of ["storeName", "description", "city"]) if (req.body[field] !== undefined) values[field] = req.body[field];
  await provider.update(values);
  res.json({ provider });
}

export async function listProducts(req, res) {
  const provider = await getOwn(req.auth.userId);
  res.json({ products: await Product.findAll({ where: { providerId: provider.id }, order: [["createdAt", "DESC"]] }) });
}

export async function createProduct(req, res) {
  const provider = await getOwn(req.auth.userId);
  const product = await Product.create({ ...req.body, providerId: provider.id });
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const provider = await getOwn(req.auth.userId);
  const product = await Product.findOne({ where: { id: req.params.id, providerId: provider.id } });
  if (!product) throw new ApiError(404, "Producto no encontrado");
  const values = {};
  for (const field of ["name", "category", "description", "brand", "model", "price", "stock", "specifications", "isActive"]) if (req.body[field] !== undefined) values[field] = req.body[field];
  await product.update(values);
  res.json({ product });
}

export async function deleteProduct(req, res) {
  const provider = await getOwn(req.auth.userId);
  const count = await Product.destroy({ where: { id: req.params.id, providerId: provider.id } });
  if (!count) throw new ApiError(404, "Producto no encontrado");
  res.status(204).end();
}

export async function listContacts(req, res) {
  const provider = await getOwn(req.auth.userId);
  res.json({ contacts: await QuoteContact.findAll({ where: { providerId: provider.id }, include: [{ model: Estimate, as: "estimate", include: [{ model: User, as: "user", attributes: ["name", "email", "phone"] }, { model: MaterialRecipe, as: "materials" }] }], order: [["createdAt", "DESC"]] }) });
}

export async function updateContact(req, res) {
  const provider = await getOwn(req.auth.userId);
  const contact = await QuoteContact.findOne({ where: { id: req.params.id, providerId: provider.id } });
  if (!contact) throw new ApiError(404, "Contacto no encontrado");
  await contact.update({ status: req.body.status });
  res.json({ contact });
}
