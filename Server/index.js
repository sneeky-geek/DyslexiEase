const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// Simple request logger to help debug deployment issues (prints method, path, origin, content-type)
app.use((req, res, next) => {
  try {
    console.log(`[Req] ${req.method} ${req.originalUrl} - Origin: ${req.headers.origin || 'no-origin'} - Content-Type: ${req.headers['content-type']}`);
  } catch (e) {
    /* ignore logging errors */
  }
  next();
});
// Configure CORS: allow a comma-separated list in FRONTEND_ORIGINS or fall back to common dev/production origins
const rawOrigins = process.env.FRONTEND_ORIGINS || 'http://localhost:5173,https://dyslexi-ease.onrender.com,https://dyslexiease-1-6vo4.onrender.com';
const allowedOrigins = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests like curl (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    // Block other origins
    return callback(new Error('CORS policy: This origin is not allowed'), false);
  },
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

// Quick handler for preflight requests
app.options('*', (req, res) => {
  res.sendStatus(204);
});

// Health check endpoint for verifying the backend is receiving requests
app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
