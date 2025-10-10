const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();

// Initialize generative client and preferred models with a fallback
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const preferredModels = ['models/gemini-2.5-flash', 'models/gemini-flash-latest'];
let model = genAI.getGenerativeModel({ model: preferredModels[0] });

// Helper to call generateContent with a one-time fallback on 404/not-found errors
async function generateWithFallback(prompt) {
  try {
    return await model.generateContent(prompt);
  } catch (err) {
    // If model not found for this API/version, try fallback once
    const msg = (err && (err.message || '')).toString().toLowerCase();
    if (err && (err.status === 404 || msg.includes('not found') || msg.includes('models/') && msg.includes('not found'))) {
      try {
        model = genAI.getGenerativeModel({ model: preferredModels[1] });
        return await model.generateContent(prompt);
      } catch (err2) {
        throw err2;
      }
    }
    throw err;
  }
}

router.post('/generate', async (req, res) => {
  try {
    const { language, complexity = 'intermediate', topic = 'daily life' } = req.body;

    if (!language || typeof language !== 'string') {
      return res.status(400).json({ error: 'Language is required and must be a string' });
    }

    const prompt = `
Generate a paragraph in ${language} that:
- Has 5 to 6 complete sentences
- Uses ${complexity}-level vocabulary
- Topic: ${topic}
- Has correct grammar and smooth flow
- Avoids proper nouns, fictional content, or formatting
- Respond only with the plain text paragraph (no labels or quotes)
`;

  const result = await generateWithFallback(prompt);
  const text = (await result.response.text()).trim();

    res.status(200).json({
      paragraph: text,
      language,
      complexity,
      topic,
      sentenceCount: text.split(/[.!?]+/).filter(Boolean).length
    });
  } catch (error) {
    console.error('Paragraph generation failed:', error);
    res.status(500).json({
      error: 'Failed to generate paragraph. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
