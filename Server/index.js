const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Public routes
app.use("/auth", require("./routes/auth"));

// ✅ Register the text processing route
app.use("/api", require("./routes/textRoutes"));

// Protected route example
app.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome to your dashboard" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
