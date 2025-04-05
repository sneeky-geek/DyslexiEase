const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

    const result = await model.generateContent(prompt);
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
