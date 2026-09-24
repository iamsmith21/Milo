import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { API_URL } from "../utils/api";

const WITTY_REASONS = [
  "Your couch will still be there at 10 PM. Sunset pickup volleyball won't.",
  "Your dog already knows all your stories. Go meet humans who don't.",
  "Nobody ever looked back on their twenties and said 'Man, I wish I scrolled more LinkedIn.'",
  "The weather is doing its thing. Best be outside enjoying it.",
  "Strangers are just friends who haven't argued about pizza toppings with you yet.",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reasonIndex, setReasonIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  function nextReason() {
    setReasonIndex((prev) => (prev + 1) % WITTY_REASONS.length);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div
      className="relative flex min-h-[calc(100vh-7rem)] flex-col justify-between overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
      style={{ background: "var(--color-page)" }}
    >
      {/* Background Ambience: Subtle Warm Grid + Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-line) 1.5px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-gold-light)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-coral-light)" }}
      />

      {/* Main 3-Column Creative Stage */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: Anti-Couch Bulletin & Wit */}
        <div className="hidden flex-col gap-6 lg:col-span-3 lg:flex">
          {/* Pinned Note */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-line bg-surface p-5 shadow-lg"
          >
            <div
              className="absolute -top-3 left-8 h-4 w-16 rounded-sm opacity-80"
              style={{ background: "var(--color-gold)", transform: "rotate(-3deg)" }}
            />
            <div className="flex items-center gap-2">
              <span className="cat-pill" data-cat="sport">Bulletin #42</span>
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Field Note</span>
            </div>
            <p className="mt-3 text-sm font-semibold leading-relaxed" style={{ color: "var(--color-ink)" }}>
              “The Couch Paradox: Your couch is 10/10 comfortable, but it has never once invited you out for tacos after a game.”
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-muted">
              <span>Milo Reality Lab</span>
              <span className="font-bold text-emerald-700">● Live Outside</span>
            </div>
          </motion.div>

          {/* Interactive Excuse Shuffler */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-line p-5 shadow-sm"
            style={{ background: "var(--color-surface-warm)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted">
                Anti-Flake Generator
              </span>
              <button
                type="button"
                onClick={nextReason}
                className="text-xs font-bold transition-transform hover:scale-105 active:scale-95"
                style={{ color: "var(--color-coral)" }}
              >
                Shuffle 🎲
              </button>
            </div>
            <p className="mt-3 text-sm italic leading-snug" style={{ color: "var(--color-ink-secondary)" }}>
              “{WITTY_REASONS[reasonIndex]}”
            </p>
          </motion.div>

          {/* Scientific Disclaimer */}
          <div className="rounded-xl border border-dashed border-line p-4 text-[12px] leading-relaxed text-muted">
            <span className="font-bold text-emerald-800">🚨 Advisory:</span> Logging into Milo may cause sudden loss of screen time, unexpected high-fives, and accidental new friendships.
          </div>
        </div>

        {/* CENTER COLUMN: The Core Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md lg:col-span-6"
        >
          <div
            className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl"
            style={{
              boxShadow: "0 24px 64px -12px rgba(45, 106, 79, 0.12), 0 0 0 1px rgba(232, 221, 208, 0.7)",
            }}
          >
            {/* Milo Color Strip */}
            <div
              className="h-2 w-full"
              style={{
                background: "linear-gradient(90deg, var(--color-green), var(--color-gold), var(--color-coral))",
              }}
            />

            <div className="p-7 sm:p-9">
              {/* Header */}
              <div className="text-center">
                <Link
                  to="/"
                  className="inline-block text-3xl font-black tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-green)" }}
                >
                  milo<span style={{ color: "var(--color-coral)" }}>.</span>
                </Link>
                <h1
                  className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                >
                  Welcome back, adventurer.
                </h1>
                <p className="mt-1.5 text-sm text-muted">
                  The real world missed you. Check what's happening today.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="email-input"
                      className="text-xs font-bold uppercase tracking-widest text-muted"
                    >
                      Email Address
                    </label>
                    <span className="text-[11px] font-medium text-muted">zero spam, promised</span>
                  </div>
                  <input
                    type="email"
                    id="email-input"
                    className="field w-full"
                    placeholder="someone.who.leaves.the.house@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password-input"
                      className="text-xs font-bold uppercase tracking-widest text-muted"
                    >
                      Secret Handshake
                    </label>
                    <span className="text-[11px] text-muted">password</span>
                  </div>
                  <input
                    type="password"
                    id="password-input"
                    className="field w-full"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl p-3.5 text-xs font-semibold"
                    style={{ background: "var(--color-coral-light)", color: "var(--color-coral)" }}
                  >
                    ⚠️ {error.message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
                  style={{ background: "var(--color-green)" }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30"
                        style={{ borderTopColor: "white" }}
                      />
                      Opening the portal…
                    </>
                  ) : (
                    <>
                      <span>Unlock the Real World</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Switcher */}
              <div className="mt-8 rounded-2xl p-4 text-center" style={{ background: "var(--color-surface-warm)" }}>
                <p className="text-xs font-medium text-muted">
                  First time here? Leave the algorithm behind.{" "}
                  <Link
                    to="/signup"
                    className="font-bold underline decoration-2 transition-opacity hover:opacity-75"
                    style={{ color: "var(--color-coral)" }}
                  >
                    Join Milo free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Ticket Stub & Field Dispatch */}
        <div className="hidden flex-col gap-6 lg:col-span-3 lg:flex">
          {/* Vintage Admit-One Stub */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-dashed border-line bg-surface p-5 shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted">
                MILO PASS #0928
              </span>
              <span className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase" style={{ background: "var(--color-green-light)", color: "var(--color-green)" }}>
                Verified Human
              </span>
            </div>
            <div className="my-3">
              <p className="text-xs font-bold" style={{ color: "var(--color-ink)" }}>
                ADMIT ONE:
              </p>
              <p className="mt-1 text-[12px] leading-snug text-muted">
                Anyone tired of group chats that say “we should totally do that” and then dissolve into silence.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[10px] tracking-widest text-muted">
              <span>||| | || |||| |</span>
              <span>VALID TODAY</span>
            </div>
          </motion.div>

          {/* Real Dispatch Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-line bg-surface p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="cat-dot" data-cat="social" />
              <span className="text-xs font-bold uppercase text-muted">Dispatch from Leo</span>
            </div>
            <p className="mt-2 text-xs italic leading-relaxed text-ink-secondary">
              “I came for evening spikeball knowing zero people, stayed for midnight noodles, and gained 3 hiking buddies.”
            </p>
            <p className="mt-2 text-[11px] font-semibold" style={{ color: "var(--color-gold)" }}>
              ★ Riverside Courts, 3 days ago
            </p>
          </motion.div>

          {/* Pill Counter */}
          <div className="flex items-center justify-around rounded-xl border border-line p-3 text-center" style={{ background: "var(--color-surface-warm)" }}>
            <div>
              <div className="text-base font-extrabold" style={{ color: "var(--color-green)", fontFamily: "var(--font-display)" }}>
                0%
              </div>
              <div className="text-[10px] font-bold uppercase text-muted">Algorithms</div>
            </div>
            <div className="h-6 w-px bg-line" />
            <div>
              <div className="text-base font-extrabold" style={{ color: "var(--color-coral)", fontFamily: "var(--font-display)" }}>
                100%
              </div>
              <div className="text-[10px] font-bold uppercase text-muted">Real Plans</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BANTER MARQUEE: Never Leaves Empty Space */}
      <div className="relative z-10 mt-6 overflow-hidden border-t border-line pt-3">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-muted">
          <span>⚡️ Plans Made, Friends Found</span>
          <span>·</span>
          <span>☕️ Coffee With Strangers</span>
          <span>·</span>
          <span>🥾 Sunrise Hikes &gt; Blue Light Screens</span>
          <span>·</span>
          <span>🎾 Bad Serves, Great Laughs</span>
          <span>·</span>
          <span>🍕 Real Food &gt; Food Photos</span>
          <span>·</span>
          <span>🛹 Leave The Group Chat In The Dust</span>
          <span>·</span>
          <span>⚡️ Plans Made, Friends Found</span>
          <span>·</span>
          <span>☕️ Coffee With Strangers</span>
          <span>·</span>
          <span>🥾 Sunrise Hikes &gt; Blue Light Screens</span>
        </div>
      </div>
    </div>
  );
}
