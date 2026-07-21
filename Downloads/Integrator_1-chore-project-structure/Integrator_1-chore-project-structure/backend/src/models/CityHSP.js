import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class CityHSP extends Model {}
CityHSP.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  city: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true } },
  department: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true } },
  hsp: { type: DataTypes.DECIMAL(4, 2), allowNull: false, validate: { min: 0.01 } },
}, { sequelize, modelName: "CityHSP", tableName: "cities_hsp", indexes: [{ unique: true, fields: ["city", "department"] }] });
export default CityHSP;