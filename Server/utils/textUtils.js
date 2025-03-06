const cmuDictPromise = import('cmu-pronouncing-dictionary');

let hyphenator;

const initializeHyphenopoly = async () => {
  const Hyphenopoly = await import('hyphenopoly');
  hyphenator = Hyphenopoly.config({
    require: ['en-us', 'hi', 'kn'],
    hyphen: '-',
    sync: true
  });
};

const detectLanguage = (text) => {
  if (/[\u0900-\u097F]/.test(text)) {
    return "hindi";
  } else if (/[\u0C80-\u0CFF]/.test(text)) {
    return "kannada";
  } else {
    return "english";
  }
};

const divideIntoSyllables = async (text, lang) => {
  if (!hyphenator) {
    await initializeHyphenopoly();
  }
  const hyphenateText = await hyphenator.get(lang);
  return hyphenateText(text).split('-');
};

const highlightPhonemes = async (syllable) => {
  const cmuDict = await cmuDictPromise;
  const phonemes = cmuDict.default.get(syllable.toLowerCase()) || [];
  return phonemes.map(phoneme => ({
    letter: phoneme,
    color: "green"
  }));
};

module.exports = { detectLanguage, divideIntoSyllables, highlightPhonemes };
