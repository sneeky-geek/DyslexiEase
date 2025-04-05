import React from "react";

const MultipleChoice = ({ question, onAnswer }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      <div className="grid gap-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(option === question.answer)}
            className="p-3 bg-[#ececec] hover:bg-[#d6d6d6] rounded-lg shadow"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
