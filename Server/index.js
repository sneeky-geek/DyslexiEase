const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authenticateToken = require("./Middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Public routes (No authentication required)
app.use("/auth", require("./routes/auth"));

// Protected routes (Require authentication)
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your dashboard", user: req.user });
});

// Add global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
