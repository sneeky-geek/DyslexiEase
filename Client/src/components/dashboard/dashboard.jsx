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

  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("english");
  const [complexity, setComplexity] = useState("intermediate");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const processText = async (customText = null) => {
    const textToProcess = customText || inputText;
    if (!textToProcess) return setError("Please enter some text.");
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3002/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToProcess }),
      });
      const data = await response.json();
      if (response.ok) {
        setOutputText(data.syllables);
        setInputText(textToProcess);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const generateAndProcessText = async () => {
    setShowModal(false);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3002/api/paragraph/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ language, complexity, topic }),
      });

      if (!res.ok) throw new Error("Failed to generate paragraph");
      const data = await res.json();
      await processText(data.paragraph);
    } catch (err) {
      setError(err.message || "Text generation failed");
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

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "");
      const cleanedInputText = inputText
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "");
      setRecognizedText(spokenText);
      setFeedback(
        spokenText === cleanedInputText
          ? "Great pronunciation!"
          : "Try again, keep practicing!"
      );
    };

    recognition.onerror = () =>
      setFeedback("Error recognizing speech. Please try again.");
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

  const speakParagraph = () => {
    if (!inputText) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.rate = 0.9;
    synth.speak(utterance);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center px-6">
      <div className="w-full max-w-3xl bg-[#f5ccad] border border-[#e69b8c] backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h1 className="text-[#4b4453] text-4xl font-extrabold mb-6 text-center">
          Text Processor
        </h1>

        <div className="relative">
          <textarea
            className="w-full h-48 bg-[#fafafa] border border-[#e0d1c7] rounded-lg text-[#4b4453] px-4 py-3 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b8a9c9] transition-all duration-300 resize-none"
            placeholder="Enter text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ fontFamily: "OpenDyslexic, sans-serif" }}
          />
        </div>

        <div className="flex justify-end mt-2">
          <button
            onClick={speakParagraph}
            className="bg-[#323232] text-white px-4 py-2 rounded-md text-sm shadow hover:scale-105 transition"
          >
            🔊 Read Aloud
          </button>
        </div>

        {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

        <div className="flex justify-center gap-4 mt-6">
          <button
            className={`bg-[#323232] text-white px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => processText()}
            disabled={loading}
          >
            {loading ? "Processing..." : "Process Text"}
          </button>

          <button
            className="bg-[#323232] text-white px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            onClick={() => setShowModal(true)}
          >
            Generate Text
          </button>
        </div>

        <h3 className="text-2xl font-bold mt-6 text-center text-[#4b4453]">
          Processed Text:
        </h3>
        <div
          className="bg-[#f5f5f5] border border-[#e0d1c7] p-4 rounded-lg mt-4 shadow-md min-h-[100px] overflow-auto text-center"
          style={{ fontFamily: "OpenDyslexic, sans-serif" }}
        >
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

        <div className="flex justify-center mt-6">
          <button
            className="bg-[#323232] text-white px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
            onClick={startListening}
          >
            Start Pronouncing
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold text-center">Generate Paragraph</h2>

            <div className="flex flex-col space-y-2">
              <label className="font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>

              <label className="font-medium">Complexity</label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <label className="font-medium">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border p-2 rounded"
                placeholder="e.g., Animals, Space..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-[#323232] text-white hover:scale-105 transition"
                onClick={generateAndProcessText}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
