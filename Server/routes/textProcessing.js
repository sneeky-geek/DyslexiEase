
// Function to detect language
const detectLanguage = (text) => {
  console.log("Detecting language for text:", text);

  if (/[\u0900-\u097F]/.test(text)) {
    console.log("Detected Hindi");
    return "hindi"; // Hindi Unicode range
  }
  if (/[\u0C80-\u0CFF]/.test(text)) {
    console.log("Detected Kannada");
    return "kannada"; // Kannada Unicode range
  }

  console.log("Detected English");
  return "english";
};

// Syllable splitting logic for English (Orton-Gillingham method)
const splitIntoSyllables = (word) => {
  console.log("\n--- Splitting Word ---");
  console.log("Processing word:", word);

  const vowels = "aeiouy";
  let syllables = [];
  let currentSyllable = "";

  for (let i = 0; i < word.length; i++) {
    currentSyllable += word[i];
    console.log(`Adding letter '${word[i]}' to current syllable: ${currentSyllable}`);

    if (vowels.includes(word[i])) {
      console.log(`Vowel detected: '${word[i]}'`);

      // Look ahead to see if there's another vowel (diphthong)
      if (i < word.length - 1 && vowels.includes(word[i + 1])) {
        console.log(`Diphthong detected: '${word[i]}' + '${word[i + 1]}'`);
        continue; // Keep adding to the syllable
      }

      // If next character is a consonant, check for VC/CV rule
      if (i < word.length - 2 && !vowels.includes(word[i + 1]) && vowels.includes(word[i + 2])) {
        console.log(`VC/CV Rule applied at index ${i}: Splitting at '${currentSyllable}'`);
        syllables.push(currentSyllable);
        currentSyllable = "";
        continue;
      }

      // End the syllable if followed by consonants
      if (i < word.length - 1 && !vowels.includes(word[i + 1])) {
        console.log(`Syllable ended at consonant: '${currentSyllable}'`);
        syllables.push(currentSyllable);
        currentSyllable = "";
      }
    }
  }

  if (currentSyllable) {
    console.log(`Adding final syllable: '${currentSyllable}'`);
    syllables.push(currentSyllable);
  }

  console.log(`Final syllables for '${word}':`, syllables);
  return syllables;
};

// Function to process text and split into syllables
const processText = (req, res) => {
  try {
    console.log("\n--- Received Request ---");
    console.log("Request Body:", req.body);

    const { text } = req.body;
    if (!text) {
      console.error("Error: No text provided");
      return res.status(400).json({ error: "No text provided" });
    }

    console.log("\n--- Processing Input Text ---");
    console.log("Input Text:", text);

    const language = detectLanguage(text);
    console.log("Detected Language:", language);

    let words = text.split(" ");
    console.log("Split Text into Words:", words);

    let syllableWords = words.map(splitIntoSyllables);
    console.log("Words Split into Syllables:", syllableWords);

    // Format: Words separated by ".", Syllables separated by "-"
    const formattedText = syllableWords.map(word => word.join("-")).join(" . ");

    console.log("\n--- Final Output ---");
    console.log("Formatted Text:", formattedText);

    res.status(200).json({ language, formattedText });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { processText };
