import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

const catConfig = {
  sport:  { color: "var(--color-coral)",  bg: "var(--color-coral-light)", label: "Sport" },
  social: { color: "var(--color-gold)",   bg: "var(--color-gold-light)",  label: "Social" },
  life:   { color: "var(--color-green)",  bg: "var(--color-green-light)", label: "Life" },
};

export default function PlanCard({ plan }) {
  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/plans/${plan.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hasJoined: true,
            confirmedPlayers: plan.confirmedPlayers + 1,
          }),
        },
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/api/plans/${plan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hasJoined: false,
          confirmedPlayers: plan.confirmedPlayers - 1,
        }),
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const { confirmedPlayers, hasJoined } = plan;
  const spotLeft = plan.capacity - confirmedPlayers;
  const fillPercent = Math.round((confirmedPlayers / plan.capacity) * 100);
  const cfg = catConfig[plan.category] || catConfig.life;

  return (
    <article
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-surface"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)";
      }}
    >
      <Link
        to={`/plan/${plan.id}`}
        className="relative block px-6 pb-5 pt-6"
        style={{ background: cfg.color }}
      >
        <div className="flex items-start justify-between">
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
            >
              {cfg.label}
            </span>
            <h2
              className="mt-3 text-xl font-bold leading-snug tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {plan.title}
            </h2>
          </div>
          <span
            className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
          >
            {fillPercent}%
          </span>
        </div>
      </Link>

      <Link to={`/plan/${plan.id}`} className="flex flex-1 flex-col px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {plan.location}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted">
                {confirmedPlayers} of {plan.capacity} joined
              </p>
              <p
                className="mt-0.5 text-sm font-bold"
                style={{ color: spotLeft === 0 ? "var(--color-coral)" : cfg.color }}
              >
                {spotLeft === 0
                  ? "Fully booked"
                  : `${spotLeft} ${spotLeft === 1 ? "spot" : "spots"} left`}
              </p>
            </div>
            {hasJoined && (
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-white"
                style={{ background: "var(--color-green)" }}
              >
                ✓
              </span>
            )}
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--color-line)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${fillPercent}%`,
                background: spotLeft === 0 ? "var(--color-coral)" : cfg.color,
                transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-[1fr_auto] gap-0 border-t border-line/60">
        <button
          className="flex items-center justify-center py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          style={{ background: hasJoined ? "var(--color-green)" : (spotLeft === 0 ? "var(--color-muted)" : cfg.color) }}
          onClick={() => joinMutation.mutate()}
          disabled={spotLeft === 0 || hasJoined}
        >
          {hasJoined ? "Joined" : spotLeft === 0 ? "Full" : "I'm in"}
        </button>

        <button
          className="border-l border-line/60 px-5 py-3.5 text-sm font-semibold text-muted transition-colors hover:bg-surface-warm hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
          onClick={() => leaveMutation.mutate()}
          disabled={!hasJoined}
        >
          Leave
        </button>
      </div>
    </article>
  );
}
