// models/Petugas.js
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
