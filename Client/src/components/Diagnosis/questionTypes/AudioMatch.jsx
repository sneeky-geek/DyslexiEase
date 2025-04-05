import React from "react";

const AudioMatch = ({ question, onAnswer }) => {
  const playAudio = () => {
    const audio = new Audio(question.audioSrc);
    audio.play();
  };

  return (
    <div className="bg-[#f5f6fa] min-h-screen p-6 font-['Roboto'] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl space-y-6 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900">{question.question}</h3>
        
        <button
          onClick={playAudio}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors shadow-sm"
        >
          🔊 Play Audio
        </button>

        <div className="grid gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(opt === question.answer)}
              className="p-3 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors shadow-sm text-left"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioMatch;
