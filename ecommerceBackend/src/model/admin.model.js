import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Creating the Admin Model

export const Admin = sequelize.define("Admin", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Gmail is Required",
      },
      isEmail: {
        msg: "Enter the Valid Gmail Address",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password is Required",
      },
    },
  },
});
