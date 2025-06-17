const express = require("express");
const Kursi = require("../models/Kursi");
const auth = require("../middleware/auth");
const router = express.Router();

// GET semua kursi
router.get("/", async (req, res) => {
  try {
    const kursi = await Kursi.findAll();
    res.json(kursi);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Statistik ketersediaan kursi dengan summary trigger lengkap
router.get("/stats", async (req, res) => {
  try {
    const sequelize = require("../config/db");
    const [[summary]] = await sequelize.query(
      "SELECT * FROM summary_kursi WHERE id=1"
    );
    res.json({
      total: summary.total,
      dipesan: summary.dipesan,
      tersedia: summary.tersedia,
      jendela: {
        total: summary.total_jendela,
        tersedia: summary.jendela_tersedia,
      },
      posisi: {
        atas: summary.atas_tersedia,
        tengah: summary.tengah_tersedia,
        bawah: summary.bawah_tersedia,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Inisialisasi data kursi (40 kursi)
router.post("/init", async (req, res) => {
  try {
    const existing = await Kursi.count();
    if (existing >= 40) {
      return res.status(400).json({ msg: "Data kursi sudah diinisialisasi." });
    }

    const kursi = [];

    for (let i = 1; i <= 40; i++) {
      const posisi = i % 3 === 1 ? "bawah" : i % 3 === 2 ? "tengah" : "atas";
      const jendela = i % 3 === 0;

      kursi.push({
        nomor_kursi: `S${i}`,
        posisi,
        jendela,
        dipesan: false,
      });
    }

    await Kursi.bulkCreate(kursi); // Sequelize equivalent of insertMany()

    res.json({ msg: "Inisialisasi kursi berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
