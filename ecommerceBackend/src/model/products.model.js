import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
