import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
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
    <div className="flex min-h-[80vh] items-center justify-center bg-red-400">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-red-400 p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            className="rounded-lg border px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            className="rounded-lg border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            className="rounded-lg border px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 rounded-lg bg-ink py-3 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
        
        {error && <p className="text-sm text-red-900">{error.message}</p>}
      </form>
    </div>
  );
}
