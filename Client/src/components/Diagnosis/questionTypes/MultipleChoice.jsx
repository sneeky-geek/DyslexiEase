import React from "react";

const MultipleChoice = ({ question, onAnswer }) => {
  return (
    <div className="font-['Roboto'] text-gray-800 bg-[#e9c7b2] p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      <div className="grid gap-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(option === question.answer)}
            className="p-3 bg-white hover:bg-[#d6d6d6] rounded-lg shadow"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
