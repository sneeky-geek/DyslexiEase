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
    question: "Which word rhymes with 'Mat'",
    options: ["Cut", "Cat", "Eat", "Dog"],
    answer: "Eat",
  },
  {
    id: 3,
    type: "multipleChoice",
    question: "Which word begins with the same sound as 'sun'?",
    options: ["Sock", "Run", "Car", "House"],
    answer: "Sock/",
  },
  {
    id: 4,
    type: "multipleChoice",
    question: "Which word sounds the same as 'bare'?",
    options: ["Bear", "Bar", "Beer", "Boar"],
    answer: "Bear",
  },

 

  // 6–7: Audio match for phonological awareness
  {
    id: 5,
    type: "audioMatch",
    question: "Select the word you hear",
    audioSrc: "/audio/sharadbird.mp3",
    options: ["Bird", "Beard", "Board"],
    answer: "Bird",
  },
  {
    id: 6,
    type: "audioMatch",
    question: "Select the word you hear",
    audioSrc: "/audio/banana.mp3",
    options: ["Banana", "April", "Dananana"],
    answer: "Banana",
  },

  // 8–9: Mirror image recognition
  {
    id: 7,
    type: "imageSelect",
    question: "Select the mirror image of the letter '9'",
    options: [
      { image: "/images/p.png", label: "p" },
      { image: "/images/d.png", label: "d" },
      { image: "/images/o.png", label: "o"},
    ],
    answer: "d",
  },
  {
    id: 8,
    type: "imageSelect",
    question: "Select the mirror image of the number '3'",
    options: [
      { image: "/images/3.png", label: "3" },
      { image: "/images/mirror3.png", label: "3" },
      { image: "/images/8.png", label: "8" },
    ],
    answer: "Mirror 3",
  },

  // 10: Sentence typing to assess motor and memory
  {
    id: 9,
    type: "textInput",
    question: "Type the following sentence: 'Dyslexia is not a disability, it’s a different ability.'",
    answer: "Dyslexia is not a disability, it’s a different ability.",
  },

  // 11–12: Interactive components for deeper evaluation
  {
    id: 10,
    type: "interactive",
    question: "Complete the Eye Tracking Test to analyze your reading patterns.",
    component: "EyeTrackingTest", // Reference to the EyeTrackingTest component
  },
  {
    id: 11,
    type: "interactive",
    question: "Use the Canvas to draw or write as instructed.",
    component: "Canvas", // Reference to the Canvas component
  },
];