import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Cart = sequelize.define("Carts", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
