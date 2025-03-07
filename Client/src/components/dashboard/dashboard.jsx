import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

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
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const processText = async () => {
    if (!inputText) {
      return setError("Please enter some text.");
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3002/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      if (response.ok) {
        setOutputText(data.syllables);
      } else {
        setError(data.error || "Something went wrong.");
      }
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
    
    recognition.onerror = (event) => {
      setFeedback("Error recognizing speech. Please try again.");
    };
    
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
    <div className="h-screen w-full flex bg-[#DDD0C8] p-8 relative">
      <div className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-[#323232] text-4xl font-extrabold font-mono mb-2 w-full text-center">
          TEXT PROCESSING
        </h1>
        <textarea
          className="w-full h-[70vh] p-4 bg-[#e2a59b] text-[#323232] rounded-lg focus:outline-none resize-none"
          placeholder="Enter text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          dir="auto"
          style={{ fontFamily: "OpenDyslexic, sans-serif" }}
        />
        <button
          className="bg-[#323232] text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition mt-4"
          onClick={processText}
          disabled={loading}
        >
          {loading ? "Processing..." : "Process Text"}
        </button>
        {error && <p className="text-red-500 mt-2 p-2">{error}</p>}
        <h3 className="text-2xl font-extrabold mt-4 p-2 w-full text-center">
          Processed Text:
        </h3>
        <div className="mt-4 p-4 bg-[#96C0B2ff] rounded-lg w-full text-center min-h-[100px] overflow-auto" style={{ fontFamily: "OpenDyslexic, sans-serif" }}>
          {outputText && outputText.length > 0 ? (
            outputText.map((word, index) => (
              <span
                key={index}
                className={`cursor-pointer mx-2 transition-all duration-200 inline-block ${
                  word === clickedWord ? fontSize : "text-4xl"
                }`}
                onClick={() => speakWord(word)}
              >
                {word}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No processed text yet</span>
          )}
        </div>
        <button
          className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition mt-4"
          onClick={startListening}
        >
          Start Pronouncing
        </button>
      </div>
      {showFeedbackWindow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-2/3 shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Pronunciation Feedback</h2>
            <p className="text-gray-700">Recognized: {recognizedText}</p>
            <p className="text-lg font-semibold mt-2">{feedback}</p>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
