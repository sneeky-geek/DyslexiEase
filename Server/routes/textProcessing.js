const detectLanguage = (text) => {
  const hindiRegex = /^[\u0900-\u097F]+$/; // Hindi Unicode range
  const kannadaRegex = /^[\u0C80-\u0CFF]+$/; // Kannada Unicode range

  if (hindiRegex.test(text)) return "hindi";
  if (kannadaRegex.test(text)) return "kannada";
  return "english";
};

// 🛠 **Hindi Syllable Division**
const divideIntoSyllablesHindi = (word) => {
  const vowels = "अआइईउऊऋएऐओऔअंअः";
  const matras = "ािीुूृेैोौंः";
  let syllables = [];
  let currentSyllable = "";

  for (let i = 0; i < word.length; i++) {
    currentSyllable += word[i];
    if (vowels.includes(word[i]) || matras.includes(word[i])) {
      syllables.push(currentSyllable);
      currentSyllable = "";
    }
  }
  if (currentSyllable) syllables.push(currentSyllable);
  return syllables;
};

// 🛠 **Kannada Syllable Division**
const divideIntoSyllablesKannada = (word) => {
  const vowels = "ಅಆಇಈಉಊಋಎಏಐಒಓಔಅಂಅಃ";
  const matras = "ಾಿೀುೂೃೆೇೈೊೋೌಂಃ";
  let syllables = [];
  let currentSyllable = "";

  for (let i = 0; i < word.length; i++) {
    currentSyllable += word[i];
    if (vowels.includes(word[i]) || matras.includes(word[i])) {
      syllables.push(currentSyllable);
      currentSyllable = "";
    }
  }
  if (currentSyllable) syllables.push(currentSyllable);
  return syllables;
};

// 🛠 **English Syllable Division (Basic)**
const divideIntoSyllablesEnglish = (word) => {
  return word.match(/[aeiouy]+[^aeiouy]*/gi) || [word];
};

// 🛠 **Phoneme Highlighting (Hindi)**
const highlightPhonemesHindi = (word) => {
  const phonemeColors = {
    "अ": "red", "आ": "blue", "इ": "green", "ई": "purple",
    "उ": "orange", "ऊ": "pink", "ए": "cyan", "ऐ": "brown",
  };

  return word.split("").map((char) => ({
    letter: char,
    color: phonemeColors[char] || "black",
  }));
};

// 🛠 **Phoneme Highlighting (Kannada)**
const highlightPhonemesKannada = (word) => {
  const phonemeColors = {
    "ಅ": "red", "ಆ": "blue", "ಇ": "green", "ಈ": "purple",
    "ಉ": "orange", "ಊ": "pink", "ಎ": "cyan", "ಏ": "brown",
  };

  return word.split("").map((char) => ({
    letter: char,
    color: phonemeColors[char] || "black",
  }));
};

// 🛠 **Phoneme Highlighting (English)**
const highlightPhonemesEnglish = (word) => {
  const phonemeColors = { "a": "red", "e": "blue", "i": "green", "o": "orange", "u": "purple" };

  return word.split("").map((char) => ({
    letter: char,
    color: phonemeColors[char.toLowerCase()] || "black",
  }));
};

// ✅ **Final Process Function**
const processText = (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const language = detectLanguage(text);
    let syllables = [];
    let phonemes = [];

    if (language === "hindi") {
      syllables = divideIntoSyllablesHindi(text);
      phonemes = highlightPhonemesHindi(text);
    } else if (language === "kannada") {
      syllables = divideIntoSyllablesKannada(text);
      phonemes = highlightPhonemesKannada(text);
    } else {
      syllables = divideIntoSyllablesEnglish(text);
      phonemes = highlightPhonemesEnglish(text);
    }

    res.status(200).json({ language, syllables, phonemes });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { processText };
