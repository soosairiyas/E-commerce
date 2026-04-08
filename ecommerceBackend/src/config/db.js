import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
);

export const dbConnect = async () => {
  try {
    // connect the server to the DB
    sequelize.authenticate();
    console.log("DataBase connected Successfully 😀");

    // sync the database table
    sequelize.sync();
  } catch (error) {
    console.log("DataBase connection failed ❌");
  }
};
