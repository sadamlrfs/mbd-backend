const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Sesuaikan path-nya

module.exports = async function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cek user di database MySQL
    const user = await User.findByPk(decoded.user.id); // Sesuai field `id` di token

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // bisa pakai user.id, user.role, dll
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
