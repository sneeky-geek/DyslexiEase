import React, { useState } from "react"; 
import Quiz from "./Quiz";
import Result from "./Result";
import EyeTrackingTest from "../Home/EyeTrackingTest"; // ✅ import your test component

const Diagnosis = () => {
  const [stage, setStage] = useState("start");
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#e9c7b2] font-['Roboto']">
      {stage === "start" && (
        <div className="text-center space-y-6 bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full">
          <h1 className="text-4xl font-extrabold text-gray-900">Dyslexia Diagnosis Quiz</h1>
          <p className="text-gray-700 text-lg">
            Test yourself with fun and simple questions!
          </p>
          <button
            onClick={() => setStage("quiz")}
            className="px-6 py-3 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-800 hover:scale-105 transition-transform duration-200"
          >
            Start Quiz
          </button>
        </div>
      )}

      {stage === "quiz" && (
        <Quiz
          setStage={(stageFromQuiz) => {
            if (stageFromQuiz === "result") {
              setStage("eyeTracking"); // ✅ go to EyeTracking first
            } else {
              setStage(stageFromQuiz);
            }
          }}
          setScore={setScore}
        />
      )}

      {stage === "eyeTracking" && (
        <EyeTrackingTest onNext={() => setStage("result")} /> // ✅ show test with next button
      )}

      {stage === "result" && <Result score={score} />}
    </div>
  );
};

export default Diagnosis;
