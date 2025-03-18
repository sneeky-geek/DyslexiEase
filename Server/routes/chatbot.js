const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    // Creating the prompt for the AI
    const prompt = `You are an AI assistant helping with difficult words.  
    - Break the word into syllables  
    - Spell it out letter by letter  
    - Provide the meaning  
    Here is the word or sentence: "${message}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text(); // Extracting response text

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
