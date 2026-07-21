import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";

export function notFound(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof UniqueConstraintError) return res.status(409).json({ error: "El registro ya existe", details: error.errors.map((item) => item.message) });
  if (error instanceof ValidationError) return res.status(422).json({ error: "Datos inválidos", details: error.errors.map((item) => item.message) });
  if (error instanceof ForeignKeyConstraintError) return res.status(409).json({ error: "El registro está relacionado con otros datos" });
  const status = error.status || 500;
  res.status(status).json({ error: status === 500 ? "Error interno del servidor" : error.message, ...(error.details && { details: error.details }) });
}
