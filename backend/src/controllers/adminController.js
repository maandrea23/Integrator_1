import bcrypt from "bcryptjs";
import { sequelize, User, Installer, Provider, Product, Estimate, MaterialRecipe, CityHSP, ApplianceCatalog } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const entityConfig = {
  users: { model: User, fields: ["name", "email", "phone", "role", "isActive"], include: [{ model: Installer, as: "installerProfile" }, { model: Provider, as: "providerProfile" }] },
  installers: { model: Installer, fields: ["userId", "companyName", "bio", "city", "certification", "verificationStatus", "rating", "available"], include: [{ model: User, as: "user", attributes: { exclude: ["passwordHash"] } }] },
  providers: { model: Provider, fields: ["userId", "storeName", "description", "city", "verificationStatus", "rating"], include: [{ model: User, as: "user", attributes: { exclude: ["passwordHash"] } }] },
  products: { model: Product, fields: ["providerId", "name", "category", "description", "brand", "model", "price", "stock", "specifications", "isActive"], include: [{ model: Provider, as: "provider", attributes: ["id", "storeName"] }] },
  materials: { model: MaterialRecipe, fields: ["estimateId", "category", "itemName", "quantity", "unit", "specification"] },
  cities: { model: CityHSP, fields: ["city", "department", "hsp"] },
  appliances: { model: ApplianceCatalog, fields: ["name", "standardPowerW", "defaultHoursPerDay", "coincidenceFactor"] },
  estimates: { model: Estimate, fields: ["status"], include: [{ model: User, as: "user", attributes: { exclude: ["passwordHash"] } }, { model: MaterialRecipe, as: "materials" }, { model: CityHSP, as: "cityHsp" }] },
};

const configFor = (entity) => {
  const config = entityConfig[entity];
  if (!config) throw new ApiError(404, "Entidad administrativa no encontrada");
  return config;
};
const pick = (body, fields) => Object.fromEntries(fields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]));

export async function list(req, res) {
  const config = configFor(req.params.entity);
  const rows = await config.model.findAll({ include: config.include, order: [["createdAt", "DESC"]] });
  res.json({ items: rows.map((row) => row instanceof User ? row.toSafeJSON() : row) });
}

export async function get(req, res) {
  const config = configFor(req.params.entity);
  const item = await config.model.findByPk(req.params.id, { include: config.include });
  if (!item) throw new ApiError(404, "Registro no encontrado");
  res.json({ item: item instanceof User ? item.toSafeJSON() : item });
}

export async function create(req, res) {
  const config = configFor(req.params.entity);
  if ([Installer, Provider].includes(config.model) && !req.body.userId) {
    for (const field of ["name", "email", "phone", "password"]) if (!req.body[field]) throw new ApiError(422, `${field} es obligatorio`);
    const role = config.model === Installer ? "installer" : "provider";
    const result = await sequelize.transaction(async (transaction) => {
      const user = await User.create({ name: req.body.name, email: req.body.email.trim().toLowerCase(), phone: req.body.phone, role, passwordHash: await bcrypt.hash(req.body.password, 12) }, { transaction });
      const profile = await config.model.create({ ...pick(req.body, config.fields), userId: user.id }, { transaction });
      return { user: user.toSafeJSON(), profile };
    });
    return res.status(201).json({ item: result.profile, user: result.user });
  }
  const values = pick(req.body, config.fields);
  if (config.model === User) {
    if (!req.body.password) throw new ApiError(422, "password es obligatorio");
    values.passwordHash = await bcrypt.hash(req.body.password, 12);
    values.email = values.email?.trim().toLowerCase();
  }
  const item = await config.model.create(values);
  res.status(201).json({ item: item instanceof User ? item.toSafeJSON() : item });
}

export async function update(req, res) {
  const config = configFor(req.params.entity);
  const item = await config.model.findByPk(req.params.id);
  if (!item) throw new ApiError(404, "Registro no encontrado");
  const values = pick(req.body, config.fields);
  if (config.model === User && req.body.password) values.passwordHash = await bcrypt.hash(req.body.password, 12);
  await sequelize.transaction(async (transaction) => {
    await item.update(values, { transaction });
    if ([Installer, Provider].includes(config.model)) {
      const userValues = pick(req.body, ["name", "email", "phone"]);
      if (req.body.password) userValues.passwordHash = await bcrypt.hash(req.body.password, 12);
      if (Object.keys(userValues).length) await User.update(userValues, { where: { id: item.userId }, transaction });
    }
  });
  res.json({ item: item instanceof User ? item.toSafeJSON() : item });
}

export async function remove(req, res) {
  const config = configFor(req.params.entity);
  if (config.model === User && Number(req.params.id) === req.auth.userId) throw new ApiError(409, "No puedes eliminar tu propia cuenta administrativa");
  let count;
  if ([Installer, Provider].includes(config.model)) {
    const profile = await config.model.findByPk(req.params.id);
    if (!profile) throw new ApiError(404, "Registro no encontrado");
    count = await User.destroy({ where: { id: profile.userId } });
  } else {
    count = await config.model.destroy({ where: { id: req.params.id } });
  }
  if (!count) throw new ApiError(404, "Registro no encontrado");
  res.status(204).end();
}

export async function dashboard(req, res) {
  const [users, installersPending, providersPending, products, estimates] = await Promise.all([
    User.count(), Installer.count({ where: { verificationStatus: "pending" } }), Provider.count({ where: { verificationStatus: "pending" } }), Product.count(), Estimate.count(),
  ]);
  res.json({ summary: { users, installersPending, providersPending, products, estimates } });
}
