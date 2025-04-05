import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const faqAnswers = useMemo(
    () => ({
      "What is the primary goal of this platform?": `To detect early signs of dyslexia and provide personalized, adaptive learning interventions using AI.`,
      "How does the system detect dyslexia in children?": `Using eye-tracking via computer vision, it identifies signs like letter reversals (e.g., "b" vs. "d"), line skipping, and reading hesitation.`,
      "What is a Dyslexia Risk Map?": `It's a visual heatmap that highlights areas of difficulty in reading, allowing for data-driven interventions instead of just a generic score.`,
      "How does the platform personalize learning?": `AI analyzes the learner's style (visual or auditory) and dynamically adapts content using the Orton-Gillingham method for phonics reinforcement.`,
      "Does the system support handwriting improvement?": `Yes, it offers real-time handwriting feedback using touchscreen input and AI to correct letter formation and improve motor skills.`,
      "What speech-related features are included?": `It includes voice recognition to provide pronunciation feedback, break words into phonics, and help with fluent word formation.`,
      "How does the platform keep learners engaged?": `Through dynamic, interactive storytelling, the learner’s progress shapes the narrative, incorporating gamification to boost motivation.`,
      "How is emotional engagement tracked?": `The platform uses AI to monitor facial expressions and body language, adjusting difficulty levels in real time based on the learner’s mood.`,
      "Is there any support for parents?": `Yes, it provides coaching tips and progress insights for parents, and connects them to a support community for shared learning.`,
      "What technologies are used in the platform?": `Frontend: React.js, Next.js, Tailwind CSS, Framer Motion. Backend: Node.js, Express.js, WebSockets. AI/ML: TensorFlow, PyTorch, OpenCV, NLP. Data: MongoDB. Security: OAuth 2.0, JWT. 3rd Party: Twilio, Google Cloud Vision, Firebase.`,
      "What are the social and economic benefits of the platform?": `Early Detection improves academic outcomes. Multilingual & adaptive, ensuring accessibility. Personalized feedback boosts learning speed. Cost-effective alternative to traditional tutoring. Scalable AI reduces long-term operational costs.`
    }),
    []
  );

  const handleSend = async (msg) => {
    const prompt = msg || input.trim();
    if (!prompt) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await res.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Sorry, I couldn't understand.";

      setMessages((prev) => [...prev, { role: "model", content: botReply }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "⚠️ Gemini API Error. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
          >
            💬
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 max-h-[80vh] bg-white border shadow-lg rounded-xl flex flex-col z-50">
          <div className="p-3 border-b font-semibold bg-gray-100 flex justify-between items-center">
            <span>Ask Me Anything</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-600 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          <div className="p-2 flex flex-wrap gap-2 overflow-y-auto max-h-40">
            {Object.keys(faqAnswers).map((question) => (
              <button
                key={question}
                onClick={() =>
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", content: question },
                    { role: "model", content: faqAnswers[question] }
                  ])
                }
                className="bg-blue-100 text-blue-900 font-medium px-3 py-1 rounded text-xs hover:bg-blue-200 transition"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="p-3 flex-1 overflow-y-auto h-64 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded max-w-[90%] ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-gray-100 text-left mr-auto"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-left text-sm animate-pulse">
                 let me think...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex border-t">
            <input
              className="flex-1 p-2 text-sm outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 text-sm hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
