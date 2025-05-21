import React, { useState } from "react"; 
import Quiz from "./Quiz";
import Result from "./Result";
import EyeTrackingTest from "../Home/EyeTrackingTest";

const Diagnosis = () => {
  const [stage, setStage] = useState("start");
  const [score, setScore] = useState(0);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: "#e9c7b2",
        color: "#323232",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="relative w-full max-w-3xl">
        {stage === "start" && (
          <div className="text-center space-y-8 bg-white p-12 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-[#323232]">
                Dyslexia Diagnosis
              </h1>
              <p className="text-[#323232] text-lg max-w-md mx-auto leading-relaxed">
                Complete this assessment to help identify potential dyslexia indicators through interactive questions.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setStage("quiz")}
                className="px-8 py-4 bg-[#323232] text-white rounded-xl shadow-md hover:shadow-xl hover:bg-[#252525] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto font-medium text-lg"
              >
                Begin Assessment
              </button>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              This test takes approximately 10 minutes to complete
            </div>
          </div>
        )}

        {stage === "quiz" && (
          <div className="animate-fade-in">
            <Quiz
              setStage={(stageFromQuiz) => {
                if (stageFromQuiz === "result") {
                  setStage("eyeTracking");
                } else {
                  setStage(stageFromQuiz);
                }
              }}
              setScore={setScore}
            />
          </div>
        )}

        {stage === "eyeTracking" && (
          <div className="animate-fade-in">
            <EyeTrackingTest onNext={() => setStage("result")} />
          </div>
        )}

        {stage === "result" && (
          <div className="animate-fade-in">
            <Result score={score} />
          </div>
        )}

        {/* Progress indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {["start", "quiz", "eyeTracking", "result"].map((step, index) => (
            <div 
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                stage === step 
                  ? "w-8 bg-[#323232]" 
                  : stage === "start" && index > 0
                  ? "w-2 bg-gray-300"
                  : stage === "quiz" && index > 1
                  ? "w-2 bg-gray-300"
                  : stage === "eyeTracking" && index > 2
                  ? "w-2 bg-gray-300"
                  : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
