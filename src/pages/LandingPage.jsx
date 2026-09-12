export default function LandingPage() {
  return (
    <>
      <section className="grid items-center gap-12 py-10 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="badge mb-6">Less scrolling. More showing up.</span>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Good plans.
            <br />
            <span className="text-brand">Better company.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Your next coffee chat, badminton match, or weekend walk starts
            with a simple hello.
          </p>

          <div className="mt-8">
            <a href="#how-it-works" className="btn-primary">
              Discover how Milo works ↗
            </a>
          </div>

          <p className="mt-4 text-sm text-muted">
            Make room for something new.
          </p>
        </div>

        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="absolute inset-4 -z-10 rotate-3 rounded-[2rem] bg-accent"
          />

          <div className="rounded-[2rem] border border-line bg-brand p-6 text-white sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white/75">
                Your next “why not?”
              </p>
              <span className="rounded-full border border-white/25 px-3 py-1 text-xs">
                A few possibilities
              </span>
            </div>

            <div className="space-y-4">
              <article className="rounded-card bg-surface p-5 text-ink">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-accent text-2xl"
                  >
                    🏸
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">
                      One more for doubles?
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      A little competition. A lot of laughs.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-card bg-surface p-5 text-ink">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-page text-2xl"
                  >
                    ☕
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">
                      Coffee with a new face
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Good conversation, no agenda.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-card bg-surface p-5 text-ink">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-accent text-2xl"
                  >
                    🌿
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">
                      Take the scenic route
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Fresh air feels better together.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <p className="mt-6 text-center text-sm text-white/75">
              Small plans can start great friendships.
            </p>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="scroll-mt-8 border-t border-line py-12 sm:py-16"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          Keep it simple
        </p>

        <h2
          id="how-heading"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          From “I’m bored” to “see you there.”
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Find your thing",
              description:
                "Browse activities that match your mood and interests.",
            },
            {
              number: "02",
              title: "Count yourself in",
              description:
                "Find a plan you like and join the people making it happen.",
            },
            {
              number: "03",
              title: "Go say hello",
              description:
                "Show up, meet someone new, and enjoy doing something together.",
            },
          ].map((step) => (
            <article
              key={step.number}
              className="rounded-card border border-line bg-surface p-6"
            >
              <span className="text-sm font-semibold text-brand">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}