const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://your-frontend-url.onrender.com' // Replace with your frontend URL for production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Public routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Register the text processing route
const textRoutes = require("./routes/textRoutes");
app.use("/api", textRoutes);

// Register the chatbot route
const chatbotRoutes = require("./routes/chatbot");
app.use("/", chatbotRoutes); // Use top-level route

// Register the paragraph generation route
const generateParagraphRoutes = require("./routes/generateParagraph");
app.use("/api/paragraph", generateParagraphRoutes);

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
