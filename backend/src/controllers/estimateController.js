import { Estimate, MaterialRecipe, CityHSP, User, QuoteContact, Installer, Provider, sequelize } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import { buildRecipe, calculateSolarEstimate } from "../services/solarCalculator.js";

const fullInclude = [{ model: MaterialRecipe, as: "materials" }, { model: CityHSP, as: "cityHsp" }];

export async function createEstimate(req, res) {
  const city = await CityHSP.findByPk(req.body.cityHspId);
  if (!city) throw new ApiError(404, "Ciudad/HSP no encontrada");
  const result = calculateSolarEstimate(req.body, city.hsp);
  const estimate = await sequelize.transaction(async (transaction) => {
    const created = await Estimate.create({ ...result, cityHspId: city.id, userId: req.auth.userId }, { transaction });
    await MaterialRecipe.bulkCreate(buildRecipe(result).map((item) => ({ ...item, estimateId: created.id })), { transaction });
    return created;
  });
  res.status(201).json({ estimate: await Estimate.findByPk(estimate.id, { include: fullInclude }) });
}

export async function listMine(req, res) {
  res.json({ estimates: await Estimate.findAll({ where: { userId: req.auth.userId }, include: fullInclude, order: [["createdAt", "DESC"]] }) });
}

export async function getEstimate(req, res) {
  const where = req.auth.role === "admin" ? { id: req.params.id } : { id: req.params.id, userId: req.auth.userId };
  const estimate = await Estimate.findOne({ where, include: fullInclude });
  if (!estimate) throw new ApiError(404, "Cotización no encontrada");
  res.json({ estimate });
}

export async function updateEstimate(req, res) {
  const estimate = await Estimate.findOne({ where: { id: req.params.id, userId: req.auth.userId } });
  if (!estimate) throw new ApiError(404, "Cotización no encontrada");
  await estimate.update({ status: req.body.status });
  res.json({ estimate });
}

export async function deleteEstimate(req, res) {
  const where = req.auth.role === "admin" ? { id: req.params.id } : { id: req.params.id, userId: req.auth.userId };
  const count = await Estimate.destroy({ where });
  if (!count) throw new ApiError(404, "Cotización no encontrada");
  res.status(204).end();
}

export async function contact(req, res) {
  const estimate = await Estimate.findOne({ where: { id: req.params.id, userId: req.auth.userId } });
  if (!estimate) throw new ApiError(404, "Cotización no encontrada");
  const recipient = req.body.installerId ? await Installer.findOne({ where: { id: req.body.installerId, verificationStatus: "approved" } }) : await Provider.findOne({ where: { id: req.body.providerId, verificationStatus: "approved" } });
  if (!recipient) throw new ApiError(404, "Destinatario verificado no encontrado");
  const created = await QuoteContact.create({ estimateId: estimate.id, installerId: req.body.installerId || null, providerId: req.body.providerId || null, message: req.body.message });
  res.status(201).json({ contact: created });
}

export async function listAll(req, res) {
  res.json({ estimates: await Estimate.findAll({ include: [...fullInclude, { model: User, as: "user", attributes: { exclude: ["passwordHash"] } }], order: [["createdAt", "DESC"]] }) });
}
