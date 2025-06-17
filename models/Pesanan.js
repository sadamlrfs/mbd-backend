const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Penumpang = require("./penumpang");
const Kursi = require("./Kursi");

const Pesanan = sequelize.define(
  "Pesanan",
  {
    id_pesanan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_penumpang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Penumpang,
        key: "id_penumpang",
      },
    },
    id_kursi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kursi,
        key: "id_kursi",
      },
    },
    waktu_pesan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "pesanan",
    timestamps: false,
  }
);

Pesanan.belongsTo(Penumpang, { foreignKey: "id_penumpang" });
Pesanan.belongsTo(Kursi, { foreignKey: "id_kursi" });

module.exports = Pesanan;
