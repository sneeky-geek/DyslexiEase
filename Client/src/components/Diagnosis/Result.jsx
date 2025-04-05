import React from "react";

const Result = ({ score }) => {
  return (
    <div className="text-center space-y-4 bg-white p-10 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-[#4b4453]">Quiz Complete!</h2>
      <p className="text-lg">Your Score: {score}</p>
      <p className="text-[#666]">
        {score >= 3
          ? "You seem to be doing well! However, consult a specialist for professional diagnosis."
          : "You might show signs of reading difficulty. Consider seeking further assessment."}
      </p>
    </div>
  );
};

export default Result;
