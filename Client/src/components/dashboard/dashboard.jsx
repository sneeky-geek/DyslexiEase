import React, { useState, useEffect } from "react";
import axios from "axios";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch flashcards and history from backend
    const fetchData = async () => {
      try {
        const flashcardsResponse = await axios.get("http://localhost:3002/flashcards");
        const historyResponse = await axios.get("http://localhost:3002/history");
        setFlashcards(flashcardsResponse.data);
        setHistory(historyResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle text submission
  const handleConvert = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/convert", { text });
      console.log("Response:", response.data);
      alert("Text sent successfully!");
    } catch (error) {
      console.error("Error sending text:", error);
      alert("Failed to send text.");
    }
  };

  return (
    <div className="h-screen w-full flex bg-[#DDD0C8] p-8">
      {/* Left Side: Text Input */}
      <div className="flex-1 flex flex-col items-center">
        <label className="text-[#323232] text-4xl font-extrabold font-mono mb-2">ENTER TEXT</label>
        <textarea
          className="w-full h-[70vh] p-4 bg-[#e2a59b] text-[#323232] rounded-lg focus:outline-none resize-none"
          placeholder="Type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* Centered Convert Button */}
        <button
          className="bg-[#323232] text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition mt-4"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>

      {/* Right Side: Flashcards & History */}
      <div className="w-1/4 flex flex-col gap-6 mt-9 ml-5">
        <div className="p-4 bg-[#96C0B2ff] text-[#323232] rounded-lg">
          <h2 className="text-4xl font-extrabold mb-2">Practice Flashcards</h2>
          {flashcards.length > 0 ? (
            <ul className="text-6xl">
              {flashcards.map((card, index) => (
                <li key={index} className="border-b py-1">{card}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No flashcards available</p>
          )}
        </div>

        <div className="p-4 bg-[#96C0B2ff] text-[#323232] rounded-lg">
          <h2 className="text-4xl font-extrabold mb-2">History</h2>
          {history.length > 0 ? (
            <ul className="text-sm">
              {history.map((entry, index) => (
                <li key={index} className="border-b py-1">{entry}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No history available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
