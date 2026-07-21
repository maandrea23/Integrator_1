import { Product, Provider, User, Installer, CityHSP, ApplianceCatalog } from "../models/index.js";

export async function listProducts(req, res) {
  const where = { isActive: true };
  if (req.query.category) where.category = req.query.category;
  const products = await Product.findAll({
    where,
    include: [{ model: Provider, as: "provider", where: { verificationStatus: "approved" }, include: [{ model: User, as: "user", attributes: ["name", "phone", "email"] }] }],
    order: [["createdAt", "DESC"]],
  });
  res.json({ products });
}

export async function getProduct(req, res) {
  const product = await Product.findByPk(req.params.id, { include: [{ model: Provider, as: "provider", include: [{ model: User, as: "user", attributes: ["name", "phone", "email"] }] }] });
  if (!product || !product.isActive || product.provider.verificationStatus !== "approved") return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ product });
}

export async function listInstallers(req, res) {
  const where = { verificationStatus: "approved" };
  if (req.query.city) where.city = req.query.city;
  res.json({ installers: await Installer.findAll({ where, include: [{ model: User, as: "user", attributes: ["name", "email", "phone"] }], order: [["rating", "DESC"]] }) });
}

export async function listCities(req, res) {
  res.json({ cities: await CityHSP.findAll({ order: [["city", "ASC"]] }) });
}

export async function listAppliances(req, res) {
  res.json({ appliances: await ApplianceCatalog.findAll({ order: [["name", "ASC"]] }) });
}
