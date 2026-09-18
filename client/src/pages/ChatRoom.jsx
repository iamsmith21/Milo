import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";

const socket = io("http://localhost:3000");
export default function ChatRoom({ planId, initialMessage }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessage);
  const [input, setInput] = useState("");

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mt-8 rounded-xl border border-line bg-surface p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Live Chat</h3>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-500 hover:underline"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm font-semibold text-blue-500 hover:underline"
          >
            Log In
          </Link>
        )}
      </div>

      <div className="mb-4 flex h-64 flex-col gap-2 overflow-y-auto rounded-lg border border-line p-4">
        {messages.length === 0 && (
          <p className="text-muted text-sm italic">No messages yet. Say hi!</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className="rounded-lg bg-gray-100 p-2 text-sm text-ink w-max max-w-[80%]"
          >
            <span className="rounded-lg bg-red-400 p-1 border mr-3 border-zinc-950">{user.name}</span>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg border border-line px-4 py-2"
          placeholder="Type a message..."
        />

        <button
          onClick={handleSend}
          className="rounded-lg bg-ink px-4 py-2 font-bold text-white transition-opacity hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
}
