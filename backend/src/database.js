import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "sunwise",
  process.env.DB_USER || "sunwise",
  process.env.DB_PASSWORD || "sunwise_local_2026",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5433),
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    define: { underscored: true, timestamps: true },
  },
);

export default sequelize;
