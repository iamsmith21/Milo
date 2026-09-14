import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-green)", minHeight: "94vh" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{ background: "rgba(231,111,81,0.18)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full"
          style={{ background: "rgba(212,160,23,0.15)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="container relative flex h-full min-h-[94vh] flex-col justify-between py-14 sm:py-20">
          <div className="flex items-center gap-3">
            <span
              className="h-px w-12 shrink-0"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Real plans · Real people · Real life
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center py-10 lg:grid lg:grid-cols-[1fr_380px] lg:items-center lg:gap-12">
            <div>
              <h1
                className="font-extrabold leading-[0.92] tracking-tight text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4rem, 11vw, 9rem)",
                }}
              >
                Plans
                <br />
                <span style={{ color: "var(--color-gold)" }}>made.</span>
                <br />
                Friends
                <br />
                <span style={{ color: "var(--color-coral)" }}>found.</span>
              </h1>

              <p
                className="mt-8 max-w-md text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Milo connects you to real-life plans — pickup games, coffee with
                strangers, sunset hikes with people who actually show up. No
                algorithm. No swiping. Just humans.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:gap-3 hover:brightness-110"
                  style={{ background: "var(--color-coral)" }}
                >
                  See what's happening
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <a
                  href="#how"
                  className="text-sm font-semibold transition-opacity hover:opacity-100"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  How it works ↓
                </a>
              </div>
            </div>

            <div className="relative mt-12 hidden lg:block" style={{ height: "420px" }}>
              <div
                className="absolute left-0 top-0 w-64 overflow-hidden rounded-2xl bg-surface shadow-xl"
                style={{ transform: "rotate(-3deg)" }}
              >
                <div className="h-1.5 w-full" style={{ background: "var(--color-coral)" }} />
                <div className="p-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: "var(--color-coral-light)", color: "var(--color-coral)" }}
                  >
                    Sport
                  </span>
                  <p
                    className="mt-3 text-base font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    Evening Badminton
                  </p>
                  <p className="mt-1 text-xs text-muted">Riverside Courts</p>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--color-line)" }}>
                    <div className="h-full w-3/4 rounded-full" style={{ background: "var(--color-coral)" }} />
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold" style={{ color: "var(--color-coral)" }}>
                    3 spots left
                  </p>
                </div>
              </div>

              <div
                className="absolute right-0 top-16 w-60 overflow-hidden rounded-2xl bg-surface shadow-xl"
                style={{ transform: "rotate(2.5deg)" }}
              >
                <div className="h-1.5 w-full" style={{ background: "var(--color-gold)" }} />
                <div className="p-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: "var(--color-gold-light)", color: "var(--color-gold)" }}
                  >
                    Social
                  </span>
                  <p
                    className="mt-3 text-base font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    Coffee with Strangers
                  </p>
                  <p className="mt-1 text-xs text-muted">Groundwork Cafe</p>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--color-line)" }}>
                    <div className="h-full w-1/2 rounded-full" style={{ background: "var(--color-gold)" }} />
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold" style={{ color: "var(--color-gold)" }}>
                    5 spots left
                  </p>
                </div>
              </div>

              <div
                className="absolute bottom-8 left-8 w-56 overflow-hidden rounded-2xl bg-surface shadow-xl"
                style={{ transform: "rotate(1deg)" }}
              >
                <div className="h-1.5 w-full" style={{ background: "var(--color-green)" }} />
                <div className="p-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: "var(--color-green-light)", color: "var(--color-green)" }}
                  >
                    Life
                  </span>
                  <p
                    className="mt-3 text-base font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    Sunrise Hike
                  </p>
                  <p className="mt-1 text-xs text-muted">Griffith Observatory</p>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--color-line)" }}>
                    <div className="h-full w-[85%] rounded-full" style={{ background: "var(--color-green)" }} />
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold" style={{ color: "var(--color-green)" }}>
                    2 spots left
                  </p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute right-4 bottom-4 grid grid-cols-4 gap-1.5"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-8 border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {[
              { num: "200+", label: "Plans created" },
              { num: "1.2k", label: "People joined" },
              { num: "3",    label: "Vibes: Sport, Social, Life" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span
                  className="text-2xl font-extrabold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.num}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative -mb-px h-16 sm:h-20" aria-hidden="true">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-full w-full"
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,60 1440,50 L1440,80 L0,80 Z"
              fill="var(--color-page)"
            />
          </svg>
        </div>
      </section>

      <div
        className="overflow-hidden border-y py-3.5"
        style={{ borderColor: "var(--color-line)" }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            "Weekend Badminton",
            "Coffee with Strangers",
            "Sunrise Hike",
            "Board Game Night",
            "Morning Run",
            "Street Food Tour",
            "Photo Walk",
            "Park Picnic",
            "Rooftop Tennis",
            "City Bike Ride",
            "Weekend Badminton",
            "Coffee with Strangers",
            "Sunrise Hike",
            "Board Game Night",
            "Morning Run",
            "Street Food Tour",
            "Photo Walk",
            "Park Picnic",
          ].map((item, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 text-sm font-semibold"
              style={{ color: "var(--color-muted)" }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background:
                    i % 3 === 0
                      ? "var(--color-coral)"
                      : i % 3 === 1
                      ? "var(--color-gold)"
                      : "var(--color-green)",
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="container py-16 sm:py-24">
        <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--color-coral)" }}
            >
              The vibes
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three ways to get off the couch.
            </h2>
          </div>
          <Link
            to="/explore"
            className="self-start text-sm font-semibold transition-opacity hover:opacity-70 sm:self-auto"
            style={{ color: "var(--color-green)" }}
          >
            Browse all plans →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 lg:row-span-2"
            style={{ background: "var(--color-coral)", minHeight: "340px" }}
          >
            <div>
              <span
                className="inline-block rounded-lg px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
              >
                Sport
              </span>
              <h3
                className="mt-6 text-3xl font-bold leading-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Move your body.
                <br />
                Meet your people.
              </h3>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Basketball. Tennis. That run you keep saying you'll start.
                Everything's better with company.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-4 select-none text-[10rem] font-extrabold leading-none text-white opacity-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              S
            </span>

            <Link
              to="/explore"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 mt-8 self-start rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              Find sport plans →
            </Link>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:col-span-1 lg:col-span-2"
            style={{ background: "var(--color-gold-light)", minHeight: "175px" }}
          >
            <span
              className="inline-block rounded-lg px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: "var(--color-gold)", color: "white" }}
            >
              Social
            </span>
            <h3
              className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            >
              Coffee runs. Game nights.
              <br />
              The good kind of plans.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              No algorithm picked these people. You just showed up, and so did
              they.
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:col-span-1 lg:col-span-2"
            style={{ background: "var(--color-green-light)", minHeight: "175px" }}
          >
            <span
              className="inline-block rounded-lg px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: "var(--color-green)", color: "white" }}
            >
              Life
            </span>
            <h3
              className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            >
              Hikes. Markets. Sunsets.
              <br />
              The stuff screens can't replace.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              The best things happen offline. Milo just helps you get there with
              the right crew.
            </p>
          </div>
        </div>
      </section>

      <section
        id="how"
        className="scroll-mt-20 border-t"
        style={{
          background: "var(--color-surface-warm)",
          borderColor: "var(--color-line)",
        }}
      >
        <div className="container py-16 sm:py-24">
          <div className="mb-14">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--color-green)" }}
            >
              Dead simple
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Three steps. Zero friction.
            </h2>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--color-line)" }}>
            {[
              {
                num: "01",
                color: "var(--color-coral)",
                title: "Browse",
                body: "Scroll through plans. Filter by sport, social, or life. Find the one that makes you think — yeah, I'd actually do that.",
              },
              {
                num: "02",
                color: "var(--color-gold)",
                title: "Join",
                body: "One button. That's it. No lengthy sign-ups, no calendar invites, no \"let me check with my friend.\" Just commit.",
              },
              {
                num: "03",
                color: "var(--color-green)",
                title: "Show up",
                body: "The app did its job. Now do yours. Walk in, say hey, and watch what happens when people actually leave the group chat.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-8 py-8 sm:gap-14"
              >
                <span
                  className="shrink-0 text-5xl font-extrabold leading-none sm:text-7xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: step.color,
                  }}
                >
                  {step.num}
                </span>
                <div className="pt-1.5">
                  <h3
                    className="text-xl font-bold sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-green)" }}
      >
        <div className="relative -mt-px h-16 sm:h-20" aria-hidden="true">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute top-0 h-full w-full"
          >
            <path
              d="M0,30 C360,0 720,60 1080,20 C1260,5 1380,15 1440,30 L1440,0 L0,0 Z"
              fill="var(--color-surface-warm)"
            />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full opacity-10"
          style={{ background: "var(--color-coral)", transform: "translate(30%, -30%)" }}
        />

        <div className="container relative py-16 sm:py-24">
          <div className="grid items-center gap-10 sm:grid-cols-2">
            <h2
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your couch is comfortable.
              <br />
              <span style={{ color: "var(--color-coral)" }}>
                The world is better.
              </span>
            </h2>
            <div className="flex flex-col items-start gap-5">
              <p style={{ color: "rgba(255,255,255,0.65)" }}>
                The hardest part is pressing the button. After that, it's just a
                good time waiting to happen.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:gap-3 hover:brightness-110"
                style={{ background: "var(--color-coral)" }}
              >
                Find your next plan
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
