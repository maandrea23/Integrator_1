import app from "./app.js";
import { sequelize } from "./models/index.js";

const port = Number(process.env.PORT || 3000);
try {
  await sequelize.authenticate();
  app.listen(port, () => console.log(`SunWise API disponible en http://localhost:${port}/api`));
} catch (error) {
  console.error("No fue posible conectar con PostgreSQL:", error.message);
  if (error.original?.code === "28P01") {
    console.error("Revisa DB_USER y DB_PASSWORD en .env. Para la base incluida ejecuta: setup.cmd");
  } else if (["ECONNREFUSED", "ENOTFOUND"].includes(error.original?.code)) {
    console.error("PostgreSQL no está disponible. Ejecuta setup.cmd antes de iniciar el backend.");
  }
  process.exit(1);
}
