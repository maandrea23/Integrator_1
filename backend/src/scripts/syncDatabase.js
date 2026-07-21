import "dotenv/config";
import { sequelize } from "../models/index.js";

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: false });
  console.log("Esquema de SunWise sincronizado");
} catch (error) {
  console.error("No se pudo preparar PostgreSQL:", error.message);
  if (error.original?.code === "28P01") console.error("Las credenciales de .env no coinciden con PostgreSQL.");
  else console.error("Ejecuta setup.cmd para iniciar la base local incluida.");
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
