// models/Pembelian.js
// SQL Equivalent:
// CREATE TABLE pembelian (
//   id_pembelian INT PRIMARY KEY AUTO_INCREMENT,
//   id_penumpang INT NOT NULL,
//   id_kereta INT NOT NULL,
//   tanggal_pembelian DATETIME NOT NULL
// );

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pembelian = sequelize.define(
  "Pembelian",
  {
    id_pembelian: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_penumpang: { type: DataTypes.INTEGER, allowNull: false },
    id_kereta: { type: DataTypes.INTEGER, allowNull: false },
    tanggal_pembelian: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "pembelian",
    timestamps: false,
  }
);

module.exports = Pembelian;
