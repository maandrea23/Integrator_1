import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export async function authenticate(req, _res, next) {
  try {
    const [scheme, token] = (req.headers.authorization || "").split(" ");
    if (scheme !== "Bearer" || !token) throw new ApiError(401, "Token de acceso requerido");
    const payload = jwt.verify(token, process.env.JWT_SECRET || "development-secret-change-me");
    const user = await User.findByPk(payload.sub);
    if (!user || !user.isActive || user.role !== payload.role) throw new ApiError(401, "Token inválido o usuario inactivo");
    req.auth = { userId: user.id, role: user.role };
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) return next(error);
    next(new ApiError(401, "Token inválido o vencido"));
  }
}

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.auth || !roles.includes(req.auth.role)) return next(new ApiError(403, "No tienes permisos para esta acción"));
  next();
};
