// models/Pembayaran.js
// SQL Equivalent:
// CREATE TABLE pembayaran (
//   id_pembayaran INT PRIMARY KEY AUTO_INCREMENT,
//   id_pesanan INT NOT NULL,
//   id_pembelian INT NULL,
//   metode VARCHAR(50) NOT NULL,
//   tanggal_pembayaran DATETIME NULL,
//   status ENUM('pending', 'berhasil', 'gagal') NOT NULL
// );

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pembayaran = sequelize.define(
  "Pembayaran",
  {
    id_pembayaran: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pesanan: { type: DataTypes.INTEGER, allowNull: false },
    id_pembelian: {
      type: DataTypes.INTEGER,
      allowNull: true, // harus true jika pakai ON DELETE SET NULL
      references: {
        model: "pembelian",
        key: "id_pembelian",
      },
    },
    metode: { type: DataTypes.STRING(50), allowNull: false },
    tanggal_pembayaran: { type: DataTypes.DATE, allowNull: true },
    status: {
      type: DataTypes.ENUM("pending", "berhasil", "gagal"),
      allowNull: false,
    },
  },
  {
    tableName: "pembayaran",
    timestamps: false,
  }
);

module.exports = Pembayaran;
