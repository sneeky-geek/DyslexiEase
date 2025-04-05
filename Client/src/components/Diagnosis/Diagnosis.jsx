import React, { useState } from "react";
import Quiz from "./Quiz";
import Result from "./Result";

const Diagnosis = () => {
  const [stage, setStage] = useState("start");
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fdf6ec]">
      {stage === "start" && (
        <div className="text-center space-y-6 bg-white p-10 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-[#4b4453]">Dyslexia Diagnosis Quiz</h1>
          <p className="text-[#666]">Test yourself with fun and simple questions!</p>
          <button
            onClick={() => setStage("quiz")}
            className="px-6 py-2 bg-[#323232] text-white rounded-full hover:scale-105 transition"
          >
            Start Quiz
          </button>
        </div>
      )}

      {stage === "quiz" && (
        <Quiz setStage={setStage} setScore={setScore} />
      )}

      {stage === "result" && <Result score={score} />}
    </div>
  );
};

export default Diagnosis;
