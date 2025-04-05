import { useState } from "react";
import { ReactMic } from "react-mic";

const PronunciationPractice = ({ targetText }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);

  const handleStop = async (recordedBlob) => {
    const formData = new FormData();
    formData.append("audio", recordedBlob.blob, "audio.wav");

    const res = await fetch("http://localhost:3002/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setTranscript(data.transcript);

    // Simple comparison logic (can be enhanced later)
    const clean = (txt) => txt.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const isMatch = clean(data.transcript) === clean(targetText);
    setFeedback(isMatch ? "✅ Great pronunciation!" : "❌ Try again.");
  };

  return (
    <div className="p-4 mt-4 border rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Practice Saying:</h2>
      <p className="text-blue-600 font-bold mb-4">{targetText}</p>

      <ReactMic
        record={recording}
        onStop={handleStop}
        mimeType="audio/wav"
        strokeColor="#000"
        backgroundColor="#eee"
        className="mb-4"
      />
      <div className="space-x-4">
        <button onClick={startRecording} className="btn bg-green-500 text-white">Start</button>
        <button onClick={stopRecording} className="btn bg-red-500 text-white">Stop</button>
      </div>

      {transcript && (
        <div className="mt-4">
          <p><strong>You said:</strong> {transcript}</p>
          <p className="mt-1">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default PronunciationPractice;
