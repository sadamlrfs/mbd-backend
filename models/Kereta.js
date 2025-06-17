// models/Kereta.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Kereta = sequelize.define(
  "Kereta",
  {
    id_kereta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_kereta: { type: DataTypes.STRING(100), allowNull: false },
    kelas: { type: DataTypes.STRING(50), allowNull: false },
    asal: { type: DataTypes.STRING(100), allowNull: false },
    tujuan: { type: DataTypes.STRING(100), allowNull: false },
    jadwal: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "kereta",
    timestamps: false,
  }
);

module.exports = Kereta;
