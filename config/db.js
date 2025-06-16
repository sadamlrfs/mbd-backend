require("dotenv").config(); // untuk baca .env

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "train_reservation",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // nonaktifkan log query SQL di console
  }
);

module.exports = sequelize;
