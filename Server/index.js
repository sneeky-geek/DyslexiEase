const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
app.use("/auth", require("./routes/auth"));

// Register the text processing route
app.use("/api", require("./routes/textRoutes"));

// Protected route example
app.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome to your dashboard" });
});

const genAI = new GoogleGenerativeAI("AIzaSyAxoak7oXxqdgDtrqg5Trt55frgHlTKxjg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate AI content
async function generateAIContent() {
    try {
        const prompt = "Explain how AI works";
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating AI content:", error);
    }
}

// Call the async function
generateAIContent();

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
