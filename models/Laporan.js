// models/Laporan.js
// SQL Equivalent:
// CREATE TABLE laporan (
//   id_laporan INT PRIMARY KEY AUTO_INCREMENT,
//   id_pembayaran INT NOT NULL,
//   id_petugas INT NOT NULL,
//   isi_laporan TEXT NOT NULL,
//   tanggal_laporan DATETIME NOT NULL
// );

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Laporan = sequelize.define(
  "Laporan",
  {
    id_laporan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pembayaran: { type: DataTypes.INTEGER, allowNull: false },
    id_petugas: { type: DataTypes.INTEGER, allowNull: false },
    isi_laporan: { type: DataTypes.TEXT, allowNull: false },
    tanggal_laporan: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "laporan",
    timestamps: false,
  }
);

module.exports = Laporan;
