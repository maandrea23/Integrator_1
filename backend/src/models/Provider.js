import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Provider extends Model {}
Provider.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  storeName: { type: DataTypes.STRING(140), allowNull: false, validate: { notEmpty: true } },
  description: DataTypes.TEXT,
  city: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true } },
  verificationStatus: { type: DataTypes.ENUM("pending", "approved", "rejected"), allowNull: false, defaultValue: "pending" },
  rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false, defaultValue: 0, validate: { min: 0, max: 5 } },
}, { sequelize, modelName: "Provider", tableName: "providers" });
export default Provider;