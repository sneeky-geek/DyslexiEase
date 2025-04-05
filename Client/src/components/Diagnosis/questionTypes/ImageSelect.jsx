import React from "react";

const ImageSelect = ({ question, onAnswer }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      <div className="grid grid-cols-3 gap-4">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className="cursor-pointer text-center"
            onClick={() => onAnswer(opt.label === question.answer)}
          >
            <img src={opt.image} alt={opt.label} className="rounded-lg w-full h-32 object-cover" />
            <p className="mt-2 font-medium">{opt.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelect;