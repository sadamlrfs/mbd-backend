// models/ETiket.js
// SQL Equivalent:
// CREATE TABLE e_tiket (
//   id_tiket INT PRIMARY KEY AUTO_INCREMENT,
//   id_pembelian INT NOT NULL,
//   kode_tiket VARCHAR(100) NOT NULL,
//   waktu_diterbitkan DATETIME NOT NULL
// );

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ETiket = sequelize.define(
  "ETiket",
  {
    id_tiket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pembelian: { type: DataTypes.INTEGER, allowNull: false },
    kode_tiket: { type: DataTypes.STRING(100), allowNull: false },
    waktu_diterbitkan: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "e_tiket",
    timestamps: false,
  }
);

module.exports = ETiket;
