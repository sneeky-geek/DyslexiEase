import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clickedWord, setClickedWord] = useState("");
  const [fontSize, setFontSize] = useState("text-4xl");
  const [recognizedText, setRecognizedText] = useState("");
  const [feedback, setFeedback] = useState("Listening...");
  const [showFeedbackWindow, setShowFeedbackWindow] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const processText = async () => {
    if (!inputText) return setError("Please enter some text.");
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3002/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      if (response.ok) setOutputText(data.syllables);
      else setError(data.error || "Something went wrong.");
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const containsEnglish = (text) => /^[A-Za-z0-9 .,!?']+$/.test(text);

  const startListening = () => {
    if (!containsEnglish(inputText)) {
      setError("Pronunciation feedback is only available for English text.");
      return;
    }
    setError("");
    setShowFeedbackWindow(true);
    setFeedback("Listening...");

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "");
      const cleanedInputText = inputText.toLowerCase().replace(/[^a-z0-9 ]/g, "");
      setRecognizedText(spokenText);
      setFeedback(spokenText === cleanedInputText ? "Great pronunciation!" : "Try again, keep practicing!");
    };

    recognition.onerror = () => setFeedback("Error recognizing speech. Please try again.");
    recognition.start();
  };

  const speakWord = (word) => {
    if (!word) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.4;
    synth.speak(utterance);
    setClickedWord(word);
    setFontSize("text-6xl");
    setTimeout(() => {
      setFontSize("text-4xl");
      setClickedWord("");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full  flex justify-center items-center px-6">
      {/* Glass-Like Dashboard */}
      <div className="w-full max-w-3xl bg-[#f5ccad] border border-[#e69b8c] backdrop-blur-md rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-8 transition-transform transform hover:scale-[1.02] duration-300">
        {/* Title */}
        <h1 className="text-[#4b4453] text-4xl font-extrabold mb-6 text-center">
          Text Processor
        </h1>

        {/* Input Box */}
        <textarea
          className="w-full h-48 bg-[#fafafa] border border-[#e0d1c7] rounded-lg text-[#4b4453] px-4 py-3 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b8a9c9] transition-all duration-300 resize-none"
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ fontFamily: "OpenDyslexic, sans-serif" }}
        />

        {/* Error Message */}
        {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

        {/* Process Button */}
        <div className="flex justify-center mt-6">
          <button
            className={` text-white px-8 py-3 rounded-full font-semibold shadow-md  transition-transform transform hover:scale-105 duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={processText}
            disabled={loading}
          >
            {loading ? "Processing..." : "Process Text"}
          </button>
        </div>

        {/* Output */}
        <h3 className="text-2xl font-bold mt-6 text-center text-[#4b4453]">
          Processed Text:
        </h3>
        <div className="bg-[#f5f5f5] border border-[#e0d1c7] p-4 rounded-lg mt-4 shadow-md min-h-[100px] overflow-auto text-center">
          {outputText.length > 0 ? (
            outputText.map((word, index) => (
              <span
                key={index}
                className={`cursor-pointer mx-2 inline-block transition-transform duration-200 ${
                  word === clickedWord ? fontSize : "text-2xl"
                }`}
                onClick={() => speakWord(word)}
              >
                {word}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No processed text yet</span>
          )}
        </div>

        {/* Start Pronouncing */}
        <div className="flex justify-center mt-6">
          <button
            className=" text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#6d5c7e] transition-transform transform hover:scale-105 duration-300"
            onClick={startListening}
          >
            Start Pronouncing
          </button>
        </div>
      </div>

      {/* Feedback Window */}
      {showFeedbackWindow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-[#4b4453]">
              Pronunciation Feedback
            </h2>
            <p className="text-gray-700">Recognized: {recognizedText}</p>
            <p className="text-lg font-semibold mt-2">{feedback}</p>
            <button
              className="mt-4 bg-[#f29b9b] text-white px-6 py-2 rounded-lg hover:bg-[#e68a8a] transition"
              onClick={() => setShowFeedbackWindow(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
