// models/Penumpang.js
// SQL Equivalent:
// CREATE TABLE penumpang (
//   id_penumpang INT PRIMARY KEY AUTO_INCREMENT,
//   nama VARCHAR(100) NOT NULL,
//   email VARCHAR(100) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   alamat TEXT NULL,
//   createdAt DATETIME NOT NULL,
//   updatedAt DATETIME NOT NULL
// );

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Penumpang = sequelize.define(
  "Penumpang",
  {
    id_penumpang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    alamat: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: "penumpang",
    timestamps: true,
  }
);

module.exports = Penumpang;
