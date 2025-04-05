export const questions = [
    {
      id: 1,
      type: "multipleChoice",
      question: "Which word is spelled correctly?",
      options: ["Recieve", "Receive", "Recive", "Receeve"],
      answer: "Receive",
    },
    {
      id: 2,
      type: "imageSelect",
      question: "Click on the image that matches the word: 'Dog'",
      options: [
        { image: "/images/cat.png", label: "Cat" },
        { image: "/images/dog.png", label: "Dog" },
        { image: "/images/horse.png", label: "Horse" },
      ],
      answer: "Dog",
    },
    {
      id: 3,
      type: "textInput",
      question: "Spell the word you hear (Hint: Apple)",
      answer: "Apple",
    },
    {
      id: 4,
      type: "audioMatch",
      question: "Select the word you hear",
      audioSrc: "/audio/bird.mp3",
      options: ["Bird", "Beard", "Board"],
      answer: "Bird",
    },
  ];