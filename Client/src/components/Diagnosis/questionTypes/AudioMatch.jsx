import React from "react";

const AudioMatch = ({ question, onAnswer }) => {
  const playAudio = () => {
    const audio = new Audio(question.audioSrc);
    audio.play();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{question.question}</h3>
      <button onClick={playAudio} className="px-4 py-2 bg-[#9c88ff] text-white rounded">
        🔊 Play Audio
      </button>
      <div className="grid gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt === question.answer)}
            className="p-3 bg-[#ececec] hover:bg-[#d6d6d6] rounded-lg shadow"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudioMatch;