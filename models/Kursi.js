const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Kursi = sequelize.define(
  "Kursi",
  {
    id_kursi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomor_kursi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dipesan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    jendela: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    posisi: {
      type: DataTypes.ENUM("bawah", "tengah", "atas"),
      defaultValue: "bawah",
    },
  },
  {
    tableName: "kursi",
    timestamps: false,
  }
);

module.exports = Kursi;
