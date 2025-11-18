import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { baseApiURL } from "../baseUrl";
import {
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
  HiOutlineBookOpen,
} from "react-icons/hi";

const defaultBotMessage = {
  role: "bot",
  text: "Hi! I'm your AI study assistant powered by Gemini. Ask me anything and I'll help you!",
};

const suggestedPrompts = [
  "Explain binary search algorithm",
  "What is object-oriented programming?",
  "How does a computer network work?",
];

const ChatBot = ({ loginid }) => {
  const [messages, setMessages] = useState([defaultBotMessage]);
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const canSend = useMemo(
    () => question.trim().length > 0 && !isSending,
    [question, isSending]
  );

  const handleSend = async (promptText) => {
    const text = promptText || question.trim();
    if (!text) {
      return;
    }

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsSending(true);

    try {
      const payload = { question: text };
      const { data } = await axios.post(`${baseApiURL()}/chat/ask`, payload);

      if (!data.success) {
        toast.error(data.message || "Unable to get answer");
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "I couldn't get an answer. Please try again later." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.answer,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Chatbot is unavailable right now.");
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong while contacting the chatbot service.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
            <HiOutlineSparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900">AI Chatbot</p>
            <p className="text-sm text-slate-500">
              Ask any question and get instant answers powered by Gemini AI.
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-2 text-xs md:text-sm rounded-2xl border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2"
      >
        {messages.map((message, index) => (
          <motion.div
            key={`${message.role}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-full rounded-2xl px-4 py-3 shadow-sm ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-slate-50 text-slate-800"
              }`}
            >
              <p className="whitespace-pre-line text-sm md:text-base">{message.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-4 flex items-center gap-3"
      >
        <div className="flex-1">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={2}
            placeholder="Type your doubt here..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={!canSend}
          className={`p-4 rounded-2xl text-white flex items-center justify-center transition-all ${
            canSend
              ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          <HiOutlinePaperAirplane className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;

