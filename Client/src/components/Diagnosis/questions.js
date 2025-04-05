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
  {
    id: 4,
    type: "imageSelect",
    question: "Click on the image that matches the word: 'Cat'",
    options: [
      { image: "/images/dog.png", label: "Dog" },
      { image: "/images/horse.png", label: "Horse" },
      { image: "/images/cat.png", label: "Cat" },
    ],
    answer: "Cat",
  },
  {
    id: 5,
    type: "imageSelect",
    question: "Click on the image that matches the word: 'Apple'",
    options: [
      { image: "/images/banana.png", label: "Banana" },
      { image: "/images/apple.png", label: "Apple" },
      { image: "/images/orange.png", label: "Orange" },
    ],
    answer: "Apple",
  },
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
  {
    id: 10,
    type: "textInput",
    question: "Type the following sentence: 'Dyslexia is not a disability, it’s a different ability.'",
    answer: "Dyslexia is not a disability, it’s a different ability.",
  },
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
