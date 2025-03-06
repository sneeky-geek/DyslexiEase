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

    // Structuring the message as a prompt
    const prompt = `You are an AI assistant helping with difficult words. 
    - Break the word into syllables
    - Spell it out letter by letter
    - Provide the meaning
    Here is the word or sentence: "${message}"`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
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
