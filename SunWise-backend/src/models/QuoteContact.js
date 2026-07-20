import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class QuoteContact extends Model {}
QuoteContact.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  estimateId: { type: DataTypes.INTEGER, allowNull: false },
  installerId: { type: DataTypes.INTEGER, allowNull: true },
  providerId: { type: DataTypes.INTEGER, allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM("sent", "read", "answered"), allowNull: false, defaultValue: "sent" },
}, {
  sequelize,
  modelName: "QuoteContact",
  tableName: "quote_contacts",
  validate: { exactlyOneRecipient() { if (Boolean(this.installerId) === Boolean(this.providerId)) throw new Error("Debe existir exactamente un destinatario"); } },
});
export default QuoteContact;