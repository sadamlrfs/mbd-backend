// models/Petugas.js
// SQL Equivalent:
// CREATE TABLE petugas (
//   id_petugas INT PRIMARY KEY AUTO_INCREMENT,
//   nama VARCHAR(100) NOT NULL,
//   email VARCHAR(100) NOT NULL,
//   no_hp VARCHAR(20) NOT NULL
// );

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Petugas = sequelize.define(
  "Petugas",
  {
    id_petugas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    no_hp: { type: DataTypes.STRING(20), allowNull: false },
  },
  {
    tableName: "petugas",
    timestamps: false,
  }
);

module.exports = Petugas;
