export const processText = (req, res) => {
    try {
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ error: "No text provided" });
      }
  
      const processedText = ortonGillinghamProcess(text);
  
      res.status(200).json({ processedText });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  const ortonGillinghamProcess = (text) => {
    const words = text.split(" ");
    return words.map((word) => ({
      original: word,
      syllables: divideIntoSyllables(word),
      phonemes: highlightPhonemes(word),
      soundOut: word.split("").join("-"), // t-h-e
    }));
  };
  
  // 🛠 Improved syllable division function (basic rule-based approach)
  const divideIntoSyllables = (word) => {
    const vowels = "aeiouy";
    let syllables = [];
    let currentSyllable = "";
  
    for (let i = 0; i < word.length; i++) {
      currentSyllable += word[i];
  
      // If a vowel is followed by a consonant, break the syllable
      if (vowels.includes(word[i]) && (i + 1 < word.length && !vowels.includes(word[i + 1]))) {
        syllables.push(currentSyllable);
        currentSyllable = "";
      }
    }
  
    if (currentSyllable) syllables.push(currentSyllable);
    return syllables;
  };
  
  // 🛠 Improved phoneme highlighting function
  const highlightPhonemes = (word) => {
    return word.split("").map((letter) => ({
      letter,
      color: getPhonemeColor(letter),
    }));
  };
  
  const getPhonemeColor = (letter) => {
    const phonemeColors = {
      "sh": "blue",
      "ch": "red",
      "th": "green",
    };
    return phonemeColors[letter.toLowerCase()] || "black";
  };
  