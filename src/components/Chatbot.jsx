import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sessionId = "default";

  // Auto-scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      const aiMessage = {
        id: Date.now() + 1,
        text: data.answer,
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Oops! Can't reach the assistant. Make sure your Python API is running on port 8000.",
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#e8e4d0] rounded-3xl border-8 border-[#8b7b5e] shadow-2xl flex flex-col h-150">
      {/* Header */}
      <div className="p-6 border-b-4 border-[#8b7b5e]">
        <h3 className="text-3xl font-bold text-[#1a4d2e]">Open Source Advisor</h3>
        <p className="text-[#1a4d2e]/70 text-sm mt-1">
          Ask me about LibreOffice, Linux, pfSense, Jitsi, Moodle and more!
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-[#1a4d2e]/60 mt-16">
            <p className="text-lg">No messages yet</p>
            <p className="italic mt-2">"What can I use instead of Microsoft Office?"</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl shadow-md ${
                msg.sender === "user"
                  ? "bg-[#1a4d2e] text-white"
                  : "bg-white text-[#1a4d2e] border-2 border-[#8b7b5e]"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <p className="text-xs opacity-70 mt-2 text-right">{msg.time}</p>
            </div>
          </div>
        ))}

        {/* Loading dots */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-[#8b7b5e] px-5 py-3 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#1a4d2e] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#1a4d2e] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#1a4d2e] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-6 border-t-4 border-[#8b7b5e]">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about open-source alternatives..."
            className="flex-1 px-5 py-3 rounded-xl border-4 border-[#8b7b5e] bg-white text-[#1a4d2e] placeholder-[#1a4d2e]/50 focus:outline-none focus:ring-4 focus:ring-[#1a4d2e]/30"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-8 py-3 bg-[#1a4d2e] text-white font-bold rounded-xl hover:bg-[#143f25] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}