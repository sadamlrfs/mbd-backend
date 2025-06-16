const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const seatRoutes = require("./routes/seats");
const bookingRoutes = require("./routes/bookings");

// DB connection (Sequelize)
const sequelize = require("./config/db");

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API is activated!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/bookings", bookingRoutes);

// Sync database & start server
const PORT = process.env.PORT || 4000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced");
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
