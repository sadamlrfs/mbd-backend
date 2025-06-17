// models/ETiket.js
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
