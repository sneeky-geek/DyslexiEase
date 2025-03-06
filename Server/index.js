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
app.use("/api/syllables", authenticateToken, require("./routes/syllables"));
app.use("/api/phonemes", authenticateToken, require("./routes/phonemes"));
app.use("/api/tts", authenticateToken, require("./routes/tts"));
app.use("/api/speech", authenticateToken, require("./routes/speech"));
app.use("/api/flashcards", authenticateToken, require("./routes/flashcards"));
app.use("/api/progress", authenticateToken, require("./routes/progress"));

app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your dashboard", user: req.user });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
