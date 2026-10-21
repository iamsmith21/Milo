import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../utils/api";
import { Send, MessageCircle } from "lucide-react";

const socket = io(API_URL);

export default function ChatRoom({ planId, initialMessage }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessage || []);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !user) return;

    socket.emit("send-message", {
      text: input.trim(),
      planId,
      userId: user.id,
    });
    setInput("");
  };

  return (
    <div className="flex h-[620px] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-xl">
      <div className="flex items-center justify-between border-b border-line/60 bg-surface px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-ink uppercase tracking-wider">
              Live Squad Chat
            </h3>
            <p className="text-[11px] text-muted">Coordinate gear, arrival, & questions</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-surface-warm/30 p-6">
        <div className="flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="mt-24 flex flex-col items-center justify-center text-center opacity-60">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface shadow-sm text-muted">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                No messages yet
              </p>
              <p className="text-xs text-muted max-w-xs mt-1">
                Say hello to the crew and break the ice!
              </p>
            </div>
          )}
          {messages.map((msg, i) => {
            const isMine = user && msg.userId === user.id;
            const senderInitial = msg.user?.name ? msg.user.name.charAt(0).toUpperCase() : "?";
            return (
              <div
                key={msg.id || i}
                className={`flex gap-2 ${isMine ? "justify-end" : "justify-start"}`}
              >
                {!isMine && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6366F1] text-[10px] font-bold text-white shadow-sm mt-auto">
                    {senderInitial}
                  </div>
                )}
                <div className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
                  {!isMine && msg.user && (
                    <span className="mb-1 ml-1 text-[11px] font-semibold text-muted">
                      {msg.user.name}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm leading-relaxed ${
                      isMine
                        ? "rounded-br-sm text-white"
                        : "rounded-bl-sm border border-line bg-surface text-ink"
                    }`}
                    style={isMine ? { background: "#FF5E3A" } : {}}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-line/60 bg-surface p-4">
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface-warm/50 py-1.5 pl-4 pr-1.5 transition-all focus-within:border-[#FF5E3A] focus-within:ring-2 focus-within:ring-[#FF5E3A]/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted/60"
            placeholder="Type a message to the group..."
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
            style={{ background: "#FF5E3A" }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
