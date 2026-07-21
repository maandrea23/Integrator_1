import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Installer extends Model {}
Installer.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  companyName: { type: DataTypes.STRING(140), allowNull: false, validate: { notEmpty: true } },
  bio: DataTypes.TEXT,
  city: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true } },
  certification: DataTypes.STRING(160),
  verificationStatus: { type: DataTypes.ENUM("pending", "approved", "rejected"), allowNull: false, defaultValue: "pending" },
  rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false, defaultValue: 0, validate: { min: 0, max: 5 } },
  available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { sequelize, modelName: "Installer", tableName: "installers" });
export default Installer;