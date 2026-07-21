import ApiError from "../utils/ApiError.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s()-]{6,19}$/;

export function validateBody(rules) {
  return (req, _res, next) => {
    const errors = [];
    for (const [field, rule] of Object.entries(rules)) {
      const value = req.body[field];
      const absent = value === undefined || value === null || value === "";
      if (rule.required && absent) errors.push(`${field} es obligatorio`);
      if (absent) continue;
      if (rule.email && !emailPattern.test(String(value))) errors.push(`${field} no es un correo válido`);
      if (rule.phone && !phonePattern.test(String(value))) errors.push(`${field} no es un teléfono válido`);
      if (rule.number && !Number.isFinite(Number(value))) errors.push(`${field} debe ser numérico`);
      if (rule.min !== undefined && Number(value) < rule.min) errors.push(`${field} debe ser mayor o igual a ${rule.min}`);
      if (rule.max !== undefined && Number(value) > rule.max) errors.push(`${field} debe ser menor o igual a ${rule.max}`);
      if (rule.oneOf && !rule.oneOf.includes(value)) errors.push(`${field} no tiene un valor permitido`);
      if (rule.minLength && String(value).length < rule.minLength) errors.push(`${field} debe tener al menos ${rule.minLength} caracteres`);
    }
    if (errors.length) return next(new ApiError(422, "Datos inválidos", errors));
    next();
  };
}

export const userRules = {
  name: { required: true }, email: { required: true, email: true },
  password: { required: true, minLength: 8 }, phone: { required: true, phone: true },
  role: { oneOf: ["user", "installer", "provider"] },
};

export const productRules = {
  name: { required: true }, category: { required: true, oneOf: ["panel", "inverter", "battery", "cable", "protection"] },
  price: { required: true, number: true, min: 0 }, stock: { required: true, number: true, min: 0 },
};
