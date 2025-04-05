import React, { useState } from "react";

const TextInput = ({ question, onAnswer }) => {
  const [input, setInput] = useState("");

  const checkAnswer = () => {
    onAnswer(input.trim().toLowerCase() === question.answer.toLowerCase());
    setInput("");
  };

  return (
    <div className="space-y-4 font-['Roboto'] text-gray-800 bg-[#e9c7b2] p-6 rounded-lg">
      <h3 className="text-xl font-semibold">{question.question}</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded w-full bg-white"
        placeholder="Type your answer here"
      />
      <button onClick={checkAnswer} className="px-4 py-2 bg-[#323232] text-white rounded shadow">
        Submit
      </button>
    </div>
  );
};

export default TextInput;
