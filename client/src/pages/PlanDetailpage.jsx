import { Link, useParams } from "react-router";
import { usePlans } from "../context/PlansContext";
import { useQuery } from "@tanstack/react-query";

const catConfig = {
  sport:  { color: "var(--color-coral)", bg: "var(--color-coral-light)", label: "Sport" },
  social: { color: "var(--color-gold)",  bg: "var(--color-gold-light)",  label: "Social" },
  life:   { color: "var(--color-green)", bg: "var(--color-green-light)", label: "Life" },
};

export default function PlanDetailPage() {
  const { id } = useParams();

  const {
    data: plan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/plans/${id}`);
      if (!response.ok) throw new Error("Failed to fetch plan");
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-28">
        <div
          className="mb-5 h-10 w-10 animate-spin rounded-full border-[3px]"
          style={{ borderColor: "var(--color-line)", borderTopColor: "var(--color-green)" }}
        />
        <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Loading the details…
        </p>
      </div>
    );

  if (isError || !plan)
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ background: "var(--color-coral)" }}
        >
          ?
        </div>
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          This plan doesn't exist
        </h2>
        <p className="mt-2 text-muted">
          It might have been removed, or the link is broken.
        </p>
        <Link to="/explore" className="btn-primary mt-6 inline-flex">
          Back to explore
        </Link>
      </div>
    );

  const cfg = catConfig[plan.category] || catConfig.life;
  const fillPercent = Math.round((plan.confirmedPlayers / plan.capacity) * 100);
  const spotsLeft = plan.capacity - plan.confirmedPlayers;

  return (
    <div className="container mx-auto max-w-2xl py-8 sm:py-12">
      <Link
        to="/explore"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        All plans
      </Link>

      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
        <div className="h-2" style={{ background: cfg.color }} />

        <div className="p-8 sm:p-10">
          <span
            className="cat-pill mb-5 inline-flex"
            data-cat={plan.category}
          >
            <span className="cat-dot" data-cat={plan.category} />
            {cfg.label}
          </span>

          <h1
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {plan.title}
          </h1>

          <p className="mt-4 text-lg text-muted">{plan.location}</p>

          <div className="my-8 h-px" style={{ background: "var(--color-line)" }} />

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Joined</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                {plan.confirmedPlayers}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Capacity</p>
              <p className="mt-1 text-3xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                {plan.capacity}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Spots left</p>
              <p
                className="mt-1 text-3xl font-extrabold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: spotsLeft === 0 ? "var(--color-coral)" : cfg.color,
                }}
              >
                {spotsLeft}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">
                {spotsLeft === 0 ? "Fully booked" : "Still room for you"}
              </span>
              <span className="text-xs font-semibold" style={{ color: cfg.color }}>
                {fillPercent}%
              </span>
            </div>
            <div className="progress-track !h-2">
              <div
                className="progress-fill"
                style={{
                  width: `${fillPercent}%`,
                  background: spotsLeft === 0 ? "var(--color-coral)" : cfg.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
