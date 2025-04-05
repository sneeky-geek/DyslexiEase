import React from "react";

const AudioMatch = ({ question, onAnswer }) => {
  const playAudio = () => {
    const audio = new Audio(question.audioSrc);
    audio.play();
  };

  return (
    <div className="bg-[#e9c7b2] min-h-screen p-6 font-['Roboto'] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">{question.question}</h3>
        <button
          onClick={playAudio}
          className="px-5 py-2 bg-[#9c88ff] text-white rounded-lg shadow hover:bg-[#7f70d7] transition"
        >
          🔊 Play Audio
        </button>
        <div className="grid gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(opt === question.answer)}
              className="p-3 bg-[#f7f7f7] hover:bg-[#ddd] rounded-lg shadow"
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
