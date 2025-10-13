const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const preferredModels = ['models/gemini-2.5-flash', 'models/gemini-flash-latest'];
let model = genAI.getGenerativeModel({ model: preferredModels[0] });

async function generateWithFallback(prompt) {
  try {
    return await model.generateContent(prompt);
  } catch (err) {
    const msg = (err && (err.message || '')).toString().toLowerCase();
    if (err && (err.status === 404 || msg.includes('not found') || (msg.includes('models/') && msg.includes('not found')))) {
      model = genAI.getGenerativeModel({ model: preferredModels[1] });
      return await model.generateContent(prompt);
    }
    throw err;
  }
}

const processText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const prompt = `Break the following text into syllables: "${text}". Return only the syllables separated by oly spaces and in the language inputted dont try to mix any other language while outputting.`;
  const result = await generateWithFallback(prompt);
  const responseText = await result.response.text(); // Extract response

    if (!responseText) {
      return res.status(500).json({ error: "Failed to process text" });
    }

    const syllables = responseText.trim().split(" ");
    res.status(200).json({ syllables });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { processText };
