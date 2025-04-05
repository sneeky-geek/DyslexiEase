import React from "react";

const MultipleChoice = ({ question, onAnswer }) => {
  return (
    <div className="font-['Roboto'] text-gray-900 bg-[#f5f6fa] p-6 rounded-2xl shadow max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">{question.question}</h3>
      <div className="grid gap-4">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(option === question.answer)}
            className="w-full text-left p-4 bg-white hover:bg-gray-100 rounded-xl shadow transition-colors text-base text-gray-800"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
