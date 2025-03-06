// filepath: /Users/smushi/Developer/DyslexiEase(JSS)/DyslexiEase/Server/routes/chatbot.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    const response = await axios.post(
      'https://gemini-api-url.com/v1/chat', // Replace with the actual Gemini API URL
      {
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ response: response.data });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;