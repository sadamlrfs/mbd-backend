// SQL Equivalent (Auth Middleware):
// -- Cek token: (verifikasi JWT di aplikasi, bukan SQL)
// -- Cek user: SELECT * FROM penumpang WHERE id_penumpang = ?;

const jwt = require("jsonwebtoken");
const Penumpang = require("../models/penumpang"); // Sesuaikan path-nya

module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cek penumpang di database MySQL
    const penumpang = await Penumpang.findByPk(decoded.user.id); // Sesuai field `id` di token

    if (!penumpang) {
      return res.status(401).json({ msg: "Penumpang tidak ditemukan" });
    }

    req.user = penumpang; // bisa pakai user.id, user.role, dll
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token tidak valid" });
  }
};
