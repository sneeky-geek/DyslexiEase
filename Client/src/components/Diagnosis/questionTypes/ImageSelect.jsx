import React from "react";

const ImageSelect = ({ question, onAnswer }) => {
  return (
    <div className="font-['Roboto'] text-gray-900 bg-[#f5f6fa] p-6 rounded-2xl shadow max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">{question.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className="cursor-pointer text-center bg-white p-4 rounded-xl shadow hover:shadow-md hover:bg-gray-100 transition-all"
            onClick={() => onAnswer(opt.label === question.answer)}
          >
            <img
              src={opt.image}
              alt={opt.label}
              className="rounded-lg w-full h-36 object-cover border border-gray-200"
            />
            <p className="mt-3 text-base font-medium text-gray-800">{opt.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelect;
