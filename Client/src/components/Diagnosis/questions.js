export const questions = [
  // 1–3: Multiple Choice Questions (MCQ) for language processing
  {
    id: 1,
    type: "multipleChoice",
    question: "Which word is spelled correctly?",
    options: ["Recieve", "Receive", "Recive", "Receeve"],
    answer: "Receive",
  },
  {
    id: 2,
    type: "multipleChoice",
    question: "Which of the following is a noun?",
    options: ["Quickly", "Run", "Apple", "Beautiful"],
    answer: "Apple",
  },
  {
    id: 3,
    type: "multipleChoice",
    question: "Which of these is a synonym for 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Scared"],
    answer: "Joyful",
  },

  // 4–5: Image identification (image shown, select correct word)
  {
    id: 4,
    type: "imageSelect",
    question: "Which word matches the image?",
    image: "/images/dog.png",
    options: ["Dog", "Bog", "Log", "Cog"],
    answer: "Dog",
  },
  {
    id: 5,
    type: "imageSelect",
    question: "Which word matches the image?",
    image: "/images/cat.png",
    options: ["Cat", "Mat", "Oat", "Mot"],
    answer: "Cat",
  },

  // 6–7: Audio match for phonological awareness
  {
    id: 6,
    type: "audioMatch",
    question: "Select the word you hear",
    audioSrc: "/audio/bird.mp3",
    options: ["Bird", "Beard", "Board"],
    answer: "Bird",
  },
  {
    id: 7,
    type: "audioMatch",
    question: "Select the word you hear",
    audioSrc: "/audio/banana.mp3",
    options: ["Banana", "April", "Dananana"],
    answer: "Banana",
  },

  // 8–9: Mirror image recognition
  {
    id: 8,
    type: "imageSelect",
    question: "Select the mirror image of the letter 'd'",
    options: [
      { image: "/images/b.png", label: "b" },
      { image: "/images/d.png", label: "d" },
      { image: "/images/o.png", label: "p" },
    ],
    answer: "d",
  },
  {
    id: 9,
    type: "imageSelect",
    question: "Select the mirror image of the number '3'",
    options: [
      { image: "/images/3.png", label: "3" },
      { image: "/images/mirror3.png", label: "Mirror 3" },
      { image: "/images/8.png", label: "8" },
    ],
    answer: "Mirror 3",
  },

  // 10: Sentence typing to assess motor and memory
  {
    id: 10,
    type: "textInput",
    question: "Type the following sentence: 'Dyslexia is not a disability, it’s a different ability.'",
    answer: "Dyslexia is not a disability, it’s a different ability.",
  },

  // 11–12: Interactive components for deeper evaluation
  {
    id: 11,
    type: "interactive",
    question: "Complete the Eye Tracking Test to analyze your reading patterns.",
    component: "EyeTrackingTest", // Reference to the EyeTrackingTest component
  },
  {
    id: 12,
    type: "interactive",
    question: "Use the Canvas to draw or write as instructed.",
    component: "Canvas", // Reference to the Canvas component
  },
];
