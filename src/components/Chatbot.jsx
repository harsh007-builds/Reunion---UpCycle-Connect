import React, { useEffect, useRef, useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m UpCycle AI.\nTell me what you want to build!"
    }
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 
  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! 😊\nWhat kind of project are you planning?";
    }

    if (
      msg.includes("project") ||
      msg.includes("make") ||
      msg.includes("build") ||
      msg.includes("college")
    ) {
      return (
        "Great choice! 🔧\n\n" +
        "Here are some project ideas using materials available on UpCycle Connect:\n\n" +
        "• **Light Detector / Automatic Night Lamp** → plastic casings + electronic scrap\n" +
        "• **Smart Dustbin** → plastic containers + sensors\n" +
        "• **Metal Strength Testing Model** → metal sheet offcuts\n" +
        "• **Cardboard Furniture Prototype** → recycled cardboard boxes\n\n" +
        "All required materials are already listed on our platform and available locally ♻️"
      );
    }

    if (msg.includes("electronics") || msg.includes("light")) {
      return (
        "For electronics-based projects 💡 you can use:\n\n" +
        "• Plastic enclosures\n" +
        "• Metal frames\n" +
        "• Reusable electronic components from labs\n\n" +
        "👉 Check **Dashboard → Listings** to explore available materials."
      );
    }

    if (
      msg.includes("eco") ||
      msg.includes("sustainable") ||
      msg.includes("environment")
    ) {
      return (
        "Love the sustainable mindset 🌱\n\n" +
        "You can build:\n" +
        "• Waste segregation models\n" +
        "• Recycling systems\n" +
        "• Reuse-based prototypes\n\n" +
        "Using UpCycle Connect materials helps reduce CO₂ footprint."
      );
    }

    if (msg.includes("bye")) {
      return "Goodbye 👋\nBest of luck with your project!";
    }

    return (
      "I can help you with:\n" +
      "• Project ideas\n" +
      "• Finding reusable materials\n" +
      "• Sustainable design suggestions\n\n" +
      "Try asking:\n*I want to make a project*"
    );
  };

  
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 h-[420px] bg-white border rounded-xl shadow-xl flex flex-col z-50">
      
      {/* HEADER */}
      <div className="px-4 py-3 border-b font-semibold bg-green-50">
        🤖 UpCycle AI Assistant
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block max-w-[90%] px-3 py-2 rounded-lg whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Ask about projects or materials..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

