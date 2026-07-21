import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class MaterialRecipe extends Model {}
MaterialRecipe.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  estimateId: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.ENUM("panel", "inverter", "battery", "cable", "protection", "structure", "other"), allowNull: false },
  itemName: { type: DataTypes.STRING(160), allowNull: false, validate: { notEmpty: true } },
  quantity: { type: DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0.01 } },
  unit: { type: DataTypes.STRING(30), allowNull: false, validate: { notEmpty: true } },
  specification: DataTypes.TEXT,
}, { sequelize, modelName: "MaterialRecipe", tableName: "materials_recipe", indexes: [{ fields: ["estimate_id"] }] });
export default MaterialRecipe;