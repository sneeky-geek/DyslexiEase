import React from "react";

const ImageSelect = ({ question, onAnswer }) => {
  return (
    <div className="font-['Roboto'] text-gray-800 bg-[#e9c7b2] p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
      <div className="grid grid-cols-3 gap-4">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className="cursor-pointer text-center bg-white p-2 rounded-lg shadow hover:bg-[#f1e3d3]"
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
