const express = require("express");
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");
const Seat = require("../models/Seat");
const User = require("../models/User");
const router = express.Router();

// Book multiple seats
router.post("/", auth, async (req, res) => {
  const { seatNumbers } = req.body;

  if (!seatNumbers || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
    return res
      .status(400)
      .json({ msg: "Please provide an array of seat numbers" });
  }

  const bookingResults = [];
  const errorSeats = [];

  try {
    for (const seatNumber of seatNumbers) {
      const seat = await Seat.findOne({ where: { seatNumber } });

      if (!seat) {
        errorSeats.push({ seatNumber, reason: "not found" });
        continue;
      }

      if (seat.isBooked) {
        errorSeats.push({ seatNumber, reason: "already booked" });
        continue;
      }

      // Mark seat as booked
      seat.isBooked = true;
      await seat.save();

      // Create booking
      const booking = await Booking.create({
        userId: req.user.id,
        seatId: seat.id,
      });

      bookingResults.push({ seatNumber, booking });
    }

    if (bookingResults.length === 0) {
      return res.status(400).json({
        msg: "Failed to book any seats",
        errors: errorSeats,
      });
    }

    res.json({
      msg: `Successfully booked ${bookingResults.length} seat(s)`,
      bookings: bookingResults,
      failed: errorSeats.length > 0 ? errorSeats : undefined,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get user bookings
router.get("/myBooking", auth, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Seat,
          attributes: ["seatNumber", "position", "isWindow"],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
