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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Text Processing</h2>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text here..."
        style={{ width: "100%", padding: "10px" }}
      />
      <br />
      <button onClick={processText} disabled={loading}>
        {loading ? "Processing..." : "Process Text"}
      </button>
      <br /><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Processed Text:</h3>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{outputText}</p>
    </div>
  );
};

export default TextEditor;
