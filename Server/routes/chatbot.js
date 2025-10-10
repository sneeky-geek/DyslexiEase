const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const preferredModels = ['models/gemini-2.5-flash', 'models/gemini-flash-latest'];
let model = genAI.getGenerativeModel({ model: preferredModels[0] });

async function generateWithFallback(prompt) {
  try {
    return await model.generateContent(prompt);
  } catch (err) {
    const msg = (err && (err.message || '')).toString().toLowerCase();
    if (err && (err.status === 404 || msg.includes('not found') || msg.includes('models/') && msg.includes('not found'))) {
      model = genAI.getGenerativeModel({ model: preferredModels[1] });
      return await model.generateContent(prompt);
    }
    throw err;
  }
}

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

  const result = await generateWithFallback(prompt);
  const responseText = (await result.response.text()); // Extracting response text

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
