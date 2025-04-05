import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: "Reply from bot (static or from server)" };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg w-80">
      <div className="p-4 h-60 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 text-${msg.sender === "user" ? "right" : "left"}`}>
            <span className={`px-3 py-1 rounded ${msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input
          className="flex-grow px-2 py-1 border rounded mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
