import React, { useState } from "react";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI("YOUR_GOOGLE_API_KEY");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const botMessage = { text: await result.response.text(), sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages([...messages, userMessage, { text: "Error: Could not get response", sender: "bot" }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="h-80 overflow-y-auto bg-white p-2 rounded-lg shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-lg text-white w-fit ${
              msg.sender === "user" ? "bg-blue-500 self-end ml-auto" : "bg-gray-600 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-3">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
