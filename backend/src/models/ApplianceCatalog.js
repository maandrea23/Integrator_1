import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class ApplianceCatalog extends Model {}
ApplianceCatalog.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { notEmpty: true } },
  standardPowerW: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0.01 } },
  defaultHoursPerDay: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 1, validate: { min: 0 } },
  coincidenceFactor: { type: DataTypes.DECIMAL(4, 3), allowNull: false, defaultValue: 1, validate: { min: 0, max: 1 } },
}, { sequelize, modelName: "ApplianceCatalog", tableName: "appliance_catalog" });
export default ApplianceCatalog;