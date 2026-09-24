import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { API_URL } from "../utils/api";

const SIGNUP_JOKES = [
  "Rule #1: If you say you're coming, show up. The coffee shop table was hard to reserve.",
  "Rule #2: It is scientifically impossible to make new friends while staring at Instagram Reels in bed.",
  "Rule #3: Bad at sports? Even better. Every great team needs enthusiastic moral support.",
  "Rule #4: High-fives are free, unlimited, and highly encouraged.",
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ruleIndex, setRuleIndex] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  function nextRule() {
    setRuleIndex((prev) => (prev + 1) % SIGNUP_JOKES.length);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
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
    <div
      className="relative flex min-h-[calc(100vh-7rem)] flex-col justify-between overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
      style={{ background: "var(--color-page)" }}
    >
      {/* Background Ambience */}
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
        className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--color-green-light)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--color-gold-light)" }}
      />

      {/* 3-Column Auth Playground */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: Milo Membership Perks & Manifesto */}
        <div className="hidden flex-col gap-6 lg:col-span-3 lg:flex">
          {/* Passport Card */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-line bg-surface p-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="cat-pill" data-cat="life">Free Forever</span>
              <span className="text-[10px] font-bold uppercase text-muted">Zero Paywalls</span>
            </div>
            <h3
              className="mt-3 text-lg font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-green)" }}
            >
              The Real-World Passport
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              You're joining 1,200+ humans who traded the feed for pickup games, casual dinners, and local trails.
            </p>
            <div className="mt-4 border-t border-line pt-3 text-[11px] font-semibold" style={{ color: "var(--color-coral)" }}>
              ✦ No swiping · No influencers · Just plans
            </div>
          </motion.div>

          {/* Interactive Community Rulebook */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-line p-5 shadow-sm"
            style={{ background: "var(--color-surface-warm)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted">
                Unspoken Milo Law
              </span>
              <button
                type="button"
                onClick={nextRule}
                className="text-xs font-bold transition-transform hover:scale-105 active:scale-95"
                style={{ color: "var(--color-green)" }}
              >
                Next Rule ↻
              </button>
            </div>
            <p className="mt-3 text-xs italic font-medium leading-relaxed" style={{ color: "var(--color-ink-secondary)" }}>
              “{SIGNUP_JOKES[ruleIndex]}”
            </p>
          </motion.div>

          {/* The Anti-Regret Meter */}
          <div className="rounded-xl border border-dashed border-line p-4 text-[11px] leading-relaxed text-muted">
            <span className="font-bold text-amber-700">💡 Fact:</span> 100% of people who showed up to an event were glad they left the house. (Even the ones who lost at bowling).
          </div>
        </div>

        {/* CENTER COLUMN: The Creative Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md lg:col-span-6"
        >
          <div
            className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl"
            style={{
              boxShadow: "0 24px 64px -12px rgba(231, 111, 81, 0.12), 0 0 0 1px rgba(232, 221, 208, 0.7)",
            }}
          >
            {/* Header Accent Line */}
            <div
              className="h-2 w-full"
              style={{
                background: "linear-gradient(90deg, var(--color-coral), var(--color-gold), var(--color-green))",
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
                  Your couch is officially jealous.
                </h1>
                <p className="mt-1.5 text-sm text-muted">
                  Create your free account and step right into today's plans.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">
                      Your Name
                    </label>
                    <span className="text-[11px] text-muted">what should people call you?</span>
                  </div>
                  <input
                    type="text"
                    className="field w-full"
                    placeholder="Alex (or your cool nickname)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">
                      Email
                    </label>
                    <span className="text-[11px] text-muted">for plan invites only</span>
                  </div>
                  <input
                    type="email"
                    className="field w-full"
                    placeholder="alex@adventures.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">
                      Password
                    </label>
                    <span className="text-[11px] text-muted">make it solid</span>
                  </div>
                  <input
                    type="password"
                    className="field w-full"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-[11px] text-muted">
                    Stronger than your urge to flake at the last minute.
                  </p>
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
                  style={{ background: "var(--color-coral)" }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30"
                        style={{ borderTopColor: "white" }}
                      />
                      Reserving your spot…
                    </>
                  ) : (
                    <>
                      <span>Claim My Spot in Reality</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Already Have Account */}
              <div className="mt-7 rounded-2xl p-3.5 text-center" style={{ background: "var(--color-surface-warm)" }}>
                <p className="text-xs font-medium text-muted">
                  Already a verified human on Milo?{" "}
                  <Link
                    to="/login"
                    className="font-bold underline decoration-2 transition-opacity hover:opacity-75"
                    style={{ color: "var(--color-green)" }}
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: What Happens Next & Community Snapshot */}
        <div className="hidden flex-col gap-6 lg:col-span-3 lg:flex">
          {/* Step Progression */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-line bg-surface p-5 shadow-lg"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">
              What Happens Next
            </span>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
                  1
                </span>
                <p className="text-xs leading-snug text-ink-secondary">
                  Browse local plans (sunset hikes, game nights, coffee).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-800">
                  2
                </span>
                <p className="text-xs leading-snug text-ink-secondary">
                  Click 'Join' on anything that excites you.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[11px] font-bold text-rose-800">
                  3
                </span>
                <p className="text-xs leading-snug text-ink-secondary">
                  Show up. Say hi. Wonder why you ever stayed in.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Snippet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-line p-5 shadow-sm"
            style={{ background: "var(--color-surface-warm)" }}
          >
            <p className="text-xs italic leading-relaxed text-ink">
              “My screen time dropped 40% in my first month on Milo. My calves hurt from hiking, and my social battery has never been happier.”
            </p>
            <p className="mt-2 text-[11px] font-bold" style={{ color: "var(--color-coral)" }}>
              — Priyah N., Sunset Hiker
            </p>
          </motion.div>

          {/* Trust Badge */}
          <div className="flex items-center justify-between rounded-xl border border-line bg-surface p-3.5 text-xs font-bold text-muted">
            <span className="flex items-center gap-1.5 text-ink">
              🛡️ No Ads. No Bull.
            </span>
            <span className="text-[10px] uppercase text-emerald-700">Community First</span>
          </div>
        </div>
      </div>

      {/* BOTTOM RUNNING BANTER MARQUEE */}
      <div className="relative z-10 mt-6 overflow-hidden border-t border-line pt-3">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-muted">
          <span>🎉 Say Goodbye To The Doomscroll</span>
          <span>·</span>
          <span>👟 Shoes On, Phone Away</span>
          <span>·</span>
          <span>☕️ Casual Hangs With Real Humans</span>
          <span>·</span>
          <span>🏐 Pick-up Volleyball</span>
          <span>·</span>
          <span>🎲 Board Game Nights</span>
          <span>·</span>
          <span>🍜 Midnight Noodle Runs</span>
          <span>·</span>
          <span>🎉 Say Goodbye To The Doomscroll</span>
          <span>·</span>
          <span>👟 Shoes On, Phone Away</span>
        </div>
      </div>
    </div>
  );
}
