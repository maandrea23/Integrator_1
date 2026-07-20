import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Product extends Model {}
Product.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  providerId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(160), allowNull: false, validate: { notEmpty: true } },
  category: { type: DataTypes.ENUM("panel", "inverter", "battery", "cable", "protection"), allowNull: false },
  description: DataTypes.TEXT,
  brand: DataTypes.STRING(100),
  model: DataTypes.STRING(100),
  price: { type: DataTypes.DECIMAL(14, 2), allowNull: false, validate: { min: 0 } },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
  specifications: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { sequelize, modelName: "Product", tableName: "products", indexes: [{ fields: ["provider_id"] }, { fields: ["category"] }] });
export default Product;