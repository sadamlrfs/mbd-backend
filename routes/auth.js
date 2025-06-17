const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Penumpang = require("../models/penumpang"); // model Sequelize
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { nama, email, password, alamat } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await Penumpang.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan penumpang baru ke database
    await Penumpang.create({
      nama,
      email,
      password: hashedPassword,
      alamat,
    });

    return res.status(201).json({ msg: "Registrasi berhasil. Silakan login." });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari penumpang berdasarkan email
    const penumpang = await Penumpang.findOne({ where: { email } });
    if (!penumpang)
      return res.status(400).json({ msg: "Email atau password salah" });

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, penumpang.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Email atau password salah" });

    // Buat token JWT
    const payload = { user: { id: penumpang.id_penumpang } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ msg: "Login berhasil!", token });
      }
    );
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
