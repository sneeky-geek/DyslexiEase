import React, { useState } from "react";
import { questions } from "./questions";
import QuestionRenderer from "./QuestionRenderer";

const Quiz = ({ setStage, setScore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userScore, updateScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) updateScore((prev) => prev + 1);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setScore(userScore + (isCorrect ? 1 : 0));
      setStage("result");
    }
  };

  return (
    <div className=" p-8 rounded-lg shadow-md max-w-2xl w-full">
      <QuestionRenderer
        key={questions[currentIndex].id}
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;