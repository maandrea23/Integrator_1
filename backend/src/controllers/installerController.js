import { Installer, User, QuoteContact, Estimate, MaterialRecipe, CityHSP } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const getOwn = (userId, options = {}) => Installer.findOne({ where: { userId }, ...options });

export async function getProfile(req, res) {
  const installer = await getOwn(req.auth.userId, { include: [{ model: User, as: "user", attributes: { exclude: ["passwordHash"] } }] });
  if (!installer) throw new ApiError(404, "Perfil de instalador no encontrado");
  res.json({ installer });
}

export async function updateProfile(req, res) {
  const installer = await getOwn(req.auth.userId);
  if (!installer) throw new ApiError(404, "Perfil de instalador no encontrado");
  const values = {};
  for (const field of ["companyName", "bio", "city", "certification", "available"]) if (req.body[field] !== undefined) values[field] = req.body[field];
  await installer.update(values);
  res.json({ installer });
}

export async function listContacts(req, res) {
  const installer = await getOwn(req.auth.userId);
  const contacts = await QuoteContact.findAll({ where: { installerId: installer.id }, include: [{ model: Estimate, as: "estimate", include: [{ model: User, as: "user", attributes: ["name", "email", "phone"] }, { model: MaterialRecipe, as: "materials" }, { model: CityHSP, as: "cityHsp" }] }], order: [["createdAt", "DESC"]] });
  res.json({ contacts });
}

export async function updateContact(req, res) {
  const installer = await getOwn(req.auth.userId);
  const contact = await QuoteContact.findOne({ where: { id: req.params.id, installerId: installer.id } });
  if (!contact) throw new ApiError(404, "Contacto no encontrado");
  await contact.update({ status: req.body.status });
  res.json({ contact });
}
