import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Estimate extends Model {}
Estimate.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  cityHspId: { type: DataTypes.INTEGER, allowNull: false },
  inputMethod: { type: DataTypes.ENUM("monthly_consumption", "appliances"), allowNull: false },
  monthlyConsumptionKwh: { type: DataTypes.DECIMAL(12, 3), allowNull: false, validate: { min: 0.001 } },
  dailyConsumptionWh: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  efficiency: { type: DataTypes.DECIMAL(4, 3), allowNull: false, validate: { min: 0.75, max: 0.8 } },
  panelNominalPowerW: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  panelIscA: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
  panelVocV: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
  panelsInSeries: { type: DataTypes.INTEGER, allowNull: false },
  arrayPowerWp: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  panelCount: { type: DataTypes.INTEGER, allowNull: false },
  peakCoincidentPowerW: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  inverterPowerW: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  systemVoltageV: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
  autonomyDays: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  batteryDod: { type: DataTypes.DECIMAL(4, 3), allowNull: false },
  batteryBankAh: { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  designCurrentA: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  dcBreakerA: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  surgeProtectionVoltageV: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  applianceSnapshot: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
  status: { type: DataTypes.ENUM("draft", "completed", "archived"), allowNull: false, defaultValue: "completed" },
}, { sequelize, modelName: "Estimate", tableName: "estimates", indexes: [{ fields: ["user_id"] }] });
export default Estimate;
