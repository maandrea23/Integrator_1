import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  toSafeJSON() {
    const value = this.toJSON();
    delete value.passwordHash;
    return value;
  }
}

User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false, validate: { notEmpty: true } },
  email: { type: DataTypes.STRING(160), allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING(25), allowNull: false, validate: { isValidPhone(value) { if (!/^\+?[0-9][0-9\s()-]{6,19}$/.test(value)) throw new Error("El teléfono no es válido"); } } },
  role: { type: DataTypes.ENUM("user", "admin", "installer", "provider"), allowNull: false, defaultValue: "user" },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { sequelize, modelName: "User", tableName: "users", indexes: [{ unique: true, fields: ["email"] }] });

export default User;
