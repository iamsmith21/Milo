import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { login } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error);
      }
      const { token, user } = await response.json();
      login(token, user);
      navigate("/explore");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-red-400 p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email-input" className="text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email-input"
            className="rounded-lg border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password-input" className="text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password-input"
            className="rounded-lg border px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded-lg bg-ink py-3 font-bold text-white transition-opacity hover:opacity-90"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
