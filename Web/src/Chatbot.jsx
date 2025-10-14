import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiBot } from "react-icons/bi";

export const Chatbot = ({ userProfile }) => {
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef(null);

  // Start new session greeting
  useEffect(() => {
    if (open && chatHistory.length === 0) {
      setChatHistory([
        {
          from: "bot",
          text: "Hello! I'm your AI Mentor 🤖. Ask me anything about scholarships, and I’ll guide you!",
        },
      ]);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Dynamic AI response logic
  const getBotResponse = (message) => {
    const name = userProfile?.name || "Student";
    const msg = message.toLowerCase();

    const responses = [];

    if (msg.includes("available") || msg.includes("list") || msg.includes("scholarship")) {
      responses.push(
        `Hi ${name}! You can explore scholarships for your study level, merit-based programs, and special grants.`
      );
    }

    if (msg.includes("apply") || msg.includes("application") || msg.includes("procedure")) {
      responses.push(
        `Hey ${name}, to apply, click 'Apply Now' on the scholarship page, fill your profile completely, and submit the required documents.`
      );
    }

    if (msg.includes("documents") || msg.includes("requirement") || msg.includes("needed")) {
      responses.push(
        `Typically, you will need ID proof, academic transcripts, recommendation letters, and any additional forms required by the scholarship.`
      );
    }

    if (responses.length === 0) {
      const fallback = [
        `Hmm, could you clarify your question, ${name}?`,
        `I'm here to guide you with scholarships, ${name}. Can you rephrase your query?`,
        `Interesting question, ${name}! Could you give me more details?`,
      ];
      responses.push(fallback[Math.floor(Math.random() * fallback.length)]);
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { from: "user", text: inputText },
      { from: "bot", text: getBotResponse(inputText) },
    ]);

    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleClosePanel = () => {
    // Reset chat history
    setChatHistory([]);
    setOpen(false);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-2xl border-2 border-blue-400 transition-all duration-300 hover:scale-110 animate-bounce"
        style={{ 
          boxShadow: "0 8px 25px rgba(0,0,0,0.2), 0 4px 15px rgba(99,102,241,0.4)" 
        }}
      >
        <BiBot className="text-3xl text-blue-600" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 font-semibold text-lg rounded-t-3xl flex items-center justify-between">
            AI Mentor
            <button
              onClick={handleClosePanel}
              className="text-white font-bold hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  msg.from === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.from === "bot" && (
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600">
                    <BiBot />
                  </div>
                )}
                {msg.from === "user" && <FaUser className="text-green-600 mt-1" />}
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                    msg.from === "bot"
                      ? "bg-white shadow-md text-gray-800 border border-gray-200"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Field */}
          <div className="border-t border-gray-200 p-3 flex items-center gap-2 bg-gray-50">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
