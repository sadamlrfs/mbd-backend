const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define(
  "Booking",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Seats",
        key: "id",
      },
    },
    bookedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Bookings",
    timestamps: false,
  }
);

// ⬇ Tambahkan ini
const Seat = require("./Seat");
const User = require("./User");

Booking.belongsTo(Seat, { foreignKey: "seatId" });
Booking.belongsTo(User, { foreignKey: "userId" });

module.exports = Booking;
