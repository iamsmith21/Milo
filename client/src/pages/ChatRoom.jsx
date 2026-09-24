import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
import { API_URL } from "../utils/api";

const socket = io(API_URL);
export default function ChatRoom({ planId, initialMessage }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessage);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    socket.emit("join-room", planId);
  }, [planId]);

  useEffect(() => {
    socket.on("receive-message", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket.off("receive-message");
  }, []);

  const handleSend = () => {
    if (!input.trim() || !user) return;

    socket.emit("send-message", {
      text: input,
      planId,
      userId: user.id,
    });
    setInput("");
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
      {/* 1. Header with Pulsing Dot */}
      <div className="flex items-center justify-between border-b border-line bg-gray-50/50 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-ink">
            Live Chat
          </h3>
        </div>
      </div>

      {/* 2. Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50/30 p-6">
        <div className="flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="mt-20 flex flex-col items-center justify-center opacity-50">
              <svg
                className="mb-2 h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-sm italic text-muted">
                It's quiet here. Break the ice!
              </p>
            </div>
          )}
          {messages.map((msg, i) => {
            const isMine = user && msg.userId === user.id;
            return (
              <div
                key={i}
                className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
              >
                {!isMine && msg.user && (
                  <span className="mb-1 ml-2 text-xs font-medium text-muted">
                    {msg.user.name}
                  </span>
                )}
                <div
                  className={`w-max max-w-[85%] rounded-2xl px-5 py-2.5 text-sm shadow-sm ${
                    isMine
                      ? "rounded-br-sm bg-coral text-white"
                      : "rounded-bl-sm border border-gray-100 bg-white text-ink"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          {/* Invisible Anchor for Auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. Modern Pill-Shaped Input Area */}
      <div className="border-t border-line bg-white p-4">
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 py-2 pl-5 pr-2 transition-all focus-within:border-coral focus-within:ring-2 focus-within:ring-coral/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <svg
              className="ml-0.5 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
