const express = require("express");
const Seat = require("../models/Seat");
const auth = require("../middleware/auth");
const router = express.Router();

// ✅ GET all seats
router.get("/", async (req, res) => {
  try {
    // SQL: SELECT * FROM Seats
    // Jenis: SELECT (mengambil semua data kursi) dari tabel Seats di MySQL
    const seats = await Seat.findAll();
    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ GET seat availability statistics
router.get("/stats", async (req, res) => {
  try {
    // SQL: SELECT COUNT(*) FROM Seats
    // Jenis: SELECT (menghitung total kursi) dari tabel Seats di MySQL
    const totalSeats = await Seat.count();
    // SQL: SELECT COUNT(*) FROM Seats WHERE isBooked = 1
    // Jenis: SELECT (menghitung kursi yang sudah dibooking) dari tabel Seats di MySQL
    const bookedSeats = await Seat.count({ where: { isBooked: true } });
    const availableSeats = totalSeats - bookedSeats;

    // SQL: SELECT COUNT(*) FROM Seats WHERE isWindow = 1
    // Jenis: SELECT (menghitung total kursi jendela) dari tabel Seats di MySQL
    const totalWindowSeats = await Seat.count({ where: { isWindow: true } });
    // SQL: SELECT COUNT(*) FROM Seats WHERE isWindow = 1 AND isBooked = 0
    // Jenis: SELECT (menghitung kursi jendela yang masih tersedia) dari tabel Seats di MySQL
    const availableWindowSeats = await Seat.count({
      where: { isWindow: true, isBooked: false },
    });

    // SQL: SELECT COUNT(*) FROM Seats WHERE position = 'upper' AND isBooked = 0
    // Jenis: SELECT (menghitung kursi posisi upper yang masih tersedia) dari tabel Seats di MySQL
    const availableUpperSeats = await Seat.count({
      where: { position: "upper", isBooked: false },
    });
    // SQL: SELECT COUNT(*) FROM Seats WHERE position = 'middle' AND isBooked = 0
    // Jenis: SELECT (menghitung kursi posisi middle yang masih tersedia) dari tabel Seats di MySQL
    const availableMiddleSeats = await Seat.count({
      where: { position: "middle", isBooked: false },
    });
    // SQL: SELECT COUNT(*) FROM Seats WHERE position = 'lower' AND isBooked = 0
    // Jenis: SELECT (menghitung kursi posisi lower yang masih tersedia) dari tabel Seats di MySQL
    const availableLowerSeats = await Seat.count({
      where: { position: "lower", isBooked: false },
    });

    res.json({
      total: totalSeats,
      booked: bookedSeats,
      available: availableSeats,
      window: {
        total: totalWindowSeats,
        available: availableWindowSeats,
      },
      positions: {
        upper: availableUpperSeats,
        middle: availableMiddleSeats,
        lower: availableLowerSeats,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ INIT seat data (40 seats)
router.post("/init", async (req, res) => {
  try {
    // SQL: SELECT COUNT(*) FROM Seats
    // Jenis: SELECT (menghitung jumlah kursi yang sudah ada) dari tabel Seats di MySQL
    const existingSeats = await Seat.count();
    if (existingSeats > 0) {
      return res.status(400).json({ msg: "Seats are already initialized" });
    }

    const seats = [];

    for (let i = 1; i <= 40; i++) {
      const position = i % 3 === 1 ? "lower" : i % 3 === 2 ? "middle" : "upper";
      const isWindow = i % 3 === 0;

      seats.push({
        seatNumber: `S${i}`,
        position,
        isWindow,
      });
    }

    // SQL: INSERT INTO Seats (seatNumber, position, isWindow) VALUES (...)
    // Jenis: INSERT (menambah banyak data kursi sekaligus) ke tabel Seats di MySQL
    await Seat.bulkCreate(seats); // Sequelize equivalent of insertMany()

    res.json({ msg: "Seats initialized successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
