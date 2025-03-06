const express = require("express");
const { processText } = require("./textProcessing");

const router = express.Router();

// ✅ Route to process text
router.post("/convert", processText);

module.exports = router;
