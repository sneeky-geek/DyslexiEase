import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

const TextEditor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clickedWord, setClickedWord] = useState(""); // Tracks the clicked word
  const [fontSize, setFontSize] = useState("text-4xl"); // Controls font size
  const navigate = useNavigate();

  const processText = async () => {
    if (!inputText) {
      console.log("Error: No text entered");
      return setError("Please enter some text.");
    }

    console.log("Sending request to backend...");
    setLoading(true);
    setError("");

    try {
      console.log("Request Payload:", { text: inputText });

      const response = await fetch("http://localhost:3002/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      console.log("Response Status:", response.status);

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        setOutputText(data.formattedText);
        console.log("Formatted Output:", data.formattedText);
      } else {
        setError(data.error || "Something went wrong.");
        console.log("Error from backend:", data.error);
      }
    } catch (err) {
      setError("Failed to connect to server.");
      console.log("Connection Error:", err);
    } finally {
      setLoading(false);
      console.log("Processing complete.");
    }
  };

  const speakWord = (word) => {
    if (!word) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);

    // 🎯 **Slow Pronunciation**
    utterance.rate = 0.4; // Super slow (0.5 is slow, 1 is normal)

    synth.speak(utterance);

    // Enlarge text temporarily
    setClickedWord(word);
    setFontSize("text-6xl"); // Increase size

    setTimeout(() => {
      setFontSize("text-4xl"); // Reset size
      setClickedWord("");
    }, 1500); // Shrinks back after 1.5 sec
  };

  return (
    <div className="h-screen w-full flex bg-[#DDD0C8] p-8 relative">
      <div className="flex-1 flex flex-col items-center p-4">
        <label className="text-[#323232] text-4xl font-extrabold font-mono mb-2">
          TEXT PROCESSING
        </label>
        <textarea
          className="w-full h-[70vh] p-4 bg-[#e2a59b] text-[#323232] rounded-lg focus:outline-none resize-none"
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-[#323232] text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition mt-4"
          onClick={processText}
          disabled={loading}
        >
          {loading ? "Processing..." : "Process Text"}
        </button>

        {error && <p className="text-red-500 mt-2 p-2">{error}</p>}

        <h3 className="text-2xl font-extrabold mt-4 p-2">Processed Text:</h3>
        <div className="mt-4 p-4 bg-[#96C0B2ff] rounded-lg w-full text-center">
          {outputText.split(" ").map((word, index) => (
            <span
              key={index}
              className={`cursor-pointer mx-2 transition-all duration-200 ${word === clickedWord ? fontSize : "text-4xl"}`}
              style={{ fontFamily: "OpenDyslexic, sans-serif" }}
              onClick={() => speakWord(word)}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Circular Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300"
        onClick={() => navigate("/dashboard/chatbot")}
      >
        <Bot size={32} />
      </button>
    </div>
  );
};

export default TextEditor;
