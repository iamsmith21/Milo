import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";

const steps = [
  { num: "01", color: "var(--color-coral)", text: "Browse plans near you" },
  { num: "02", color: "var(--color-gold)", text: "Hit join — one tap" },
  {
    num: "03",
    color: "var(--color-green-light)",
    text: "Show up & meet people",
  },
];

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
        headers: { "Content-Type": "application/json" },
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
    <div className="flex min-h-[calc(100vh-64px)]">
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-1/2"
        style={{ background: "var(--color-green)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
          style={{ background: "rgba(231,111,81,0.2)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full"
          style={{ background: "rgba(212,160,23,0.15)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Link
          to="/"
          className="relative text-2xl font-extrabold tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          milo<span style={{ color: "var(--color-coral)" }}>.</span>
        </Link>

        <div className="relative">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            How it works
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {steps.map((s) => (
              <div key={s.num} className="flex items-center gap-5">
                <span
                  className="text-4xl font-extrabold leading-none"
                  style={{ fontFamily: "var(--font-display)", color: s.color }}
                >
                  {s.num}
                </span>
                <span className="text-base font-medium text-white/80">
                  {s.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p
            className="text-4xl font-extrabold leading-tight tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop scrolling.
            <br />
            Start <span style={{ color: "var(--color-coral)" }}>doing.</span>
          </p>
          <p
            className="mt-4 text-sm"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Join a community that meets IRL, not just online.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1
              className="text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Create your account
            </h1>
            <p className="mt-2 text-muted">
              Free forever. No credit card. Just show up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
                Your name
              </label>
              <input
                type="text"
                className="field w-full"
                placeholder="Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                type="email"
                className="field w-full"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
                Password
              </label>
              <input
                type="password"
                className="field w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p
                className="rounded-lg px-4 py-3 text-sm font-medium"
                style={{
                  background: "var(--color-coral-light)",
                  color: "var(--color-coral)",
                }}
              >
                {error.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50"
              style={{ background: "var(--color-green)" }}
            >
              {isLoading ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30"
                    style={{ borderTopColor: "white" }}
                  />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold transition-opacity hover:opacity-70"
              style={{ color: "var(--color-green)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
