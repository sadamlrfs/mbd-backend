const Booking = require("./Booking");
const Seat = require("./Seat");
const User = require("./User");

// Booking belongs to Seat
Booking.belongsTo(Seat, { foreignKey: "seatId" });
Seat.hasMany(Booking, { foreignKey: "seatId" });

// Booking belongs to User
Booking.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Booking, { foreignKey: "userId" });

module.exports = {
  Booking,
  Seat,
  User,
};
