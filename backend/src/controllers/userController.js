import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export async function updateProfile(req, res) {
  const values = {};
  for (const field of ["name", "phone"]) if (req.body[field] !== undefined) values[field] = req.body[field];
  if (req.body.email !== undefined) values.email = req.body.email.trim().toLowerCase();
  if (req.body.password) values.passwordHash = await bcrypt.hash(req.body.password, 12);
  await req.user.update(values);
  res.json({ user: req.user.toSafeJSON() });
}

export async function deleteOwnAccount(req, res) {
  if (req.user.role === "admin") throw new ApiError(403, "Un administrador no puede eliminar su cuenta desde este endpoint");
  await req.user.destroy();
  res.status(204).end();
}
