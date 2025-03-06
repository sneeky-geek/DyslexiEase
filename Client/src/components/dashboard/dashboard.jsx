import React, { useState } from "react";

const TextEditor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="h-screen w-full flex bg-[#DDD0C8] p-8">
      <div className="flex-1 flex flex-col items-center p-4">
        <label className="text-[#323232] text-4xl font-extrabold font-mono mb-2">TEXT PROCESSING</label>
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
          <p className="text-4xl font-mono p-2" style={{ fontFamily: "OpenDyslexic, sans-serif" }}>{outputText}</p>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
