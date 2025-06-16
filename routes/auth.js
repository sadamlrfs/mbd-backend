const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // model Sequelize
const router = express.Router();

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru ke database
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ msg: "User registered successfully. Please log in." });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Buat token JWT
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ msg: "Login successful!", token });
      }
    );
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
