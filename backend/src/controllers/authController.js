import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sequelize, User, Installer, Provider } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const signToken = (user) => jwt.sign(
  { sub: user.id, role: user.role },
  process.env.JWT_SECRET || "development-secret-change-me",
  { expiresIn: process.env.JWT_EXPIRES_IN || "8h" },
);

export async function register(req, res) {
  const role = req.body.role || "user";
  if (!['user', 'installer', 'provider'].includes(role)) throw new ApiError(422, "Rol de registro no permitido");
  const email = req.body.email.trim().toLowerCase();
  if (await User.findOne({ where: { email } })) throw new ApiError(409, "El correo ya está registrado");

  const created = await sequelize.transaction(async (transaction) => {
    const user = await User.create({
      name: req.body.name.trim(), email, phone: req.body.phone.trim(), role,
      passwordHash: await bcrypt.hash(req.body.password, 12),
    }, { transaction });
    if (role === "installer") {
      if (!req.body.companyName || !req.body.city) throw new ApiError(422, "companyName y city son obligatorios para instaladores");
      await Installer.create({ userId: user.id, companyName: req.body.companyName, city: req.body.city, certification: req.body.certification }, { transaction });
    }
    if (role === "provider") {
      if (!req.body.storeName || !req.body.city) throw new ApiError(422, "storeName y city son obligatorios para proveedores");
      await Provider.create({ userId: user.id, storeName: req.body.storeName, city: req.body.city, description: req.body.description }, { transaction });
    }
    return user;
  });

  res.status(201).json({ token: signToken(created), user: created.toSafeJSON() });
}

export async function login(req, res) {
  const user = await User.findOne({ where: { email: req.body.email.trim().toLowerCase() } });
  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) throw new ApiError(401, "Correo o contraseña incorrectos");
  if (!user.isActive) throw new ApiError(403, "Cuenta desactivada");
  res.json({ token: signToken(user), user: user.toSafeJSON() });
}

export async function me(req, res) {
  const include = req.user.role === "installer" ? [{ model: Installer, as: "installerProfile" }] : req.user.role === "provider" ? [{ model: Provider, as: "providerProfile" }] : [];
  const user = await User.findByPk(req.user.id, { include });
  res.json({ user: user.toSafeJSON() });
}
