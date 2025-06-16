const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // pastikan ini adalah koneksi Sequelize-mu

const Seat = sequelize.define(
  "Seat",
  {
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isWindow: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    position: {
      type: DataTypes.ENUM("lower", "middle", "upper"),
      defaultValue: "lower",
    },
  },
  {
    tableName: "Seats",
    timestamps: false, // nonaktifkan createdAt dan updatedAt otomatis
  }
);

module.exports = Seat;
