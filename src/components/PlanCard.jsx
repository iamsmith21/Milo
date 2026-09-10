import { useState } from "react";

export default function PlanCard({ plan }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);

  const spotLeft = plan.capacity - confirmedPlayers;

  const handleLeave = () => {
    setConfirmedPlayers((prev) => Math.max(prev - 1, 0));
    setHasJoined(false);
  };

  const handleJoin = () => {
    setConfirmedPlayers(Math.min(confirmedPlayers + 1, plan.capacity));
    setHasJoined(true);
  };

  return (
  <article className="plan-card">
    <div className="flex items-center justify-between gap-3">
      <span className="badge">Make a plan</span>

      <span className="text-xs font-medium text-muted">
        {confirmedPlayers}/{plan.capacity} joined
      </span>
    </div>

    <div>
      <h2 className="plan-title">{plan.title}</h2>

      <p className="plan-location mt-2">
        <span className="font-medium">Location:</span> {plan.location}
      </p>
    </div>

    <div className="rounded-control bg-page px-4 py-3">
      <p className="plan-spots">
        {spotLeft === 0
          ? "This plan is full"
          : `${spotLeft} ${spotLeft === 1 ? "spot" : "spots"} available`}
      </p>

      <p className="mt-1 text-sm text-muted">
        {hasJoined
          ? "You're in! Your place is reserved."
          : "Join the plan and meet your next crew."}
      </p>
    </div>

    <div className="card-actions">
      <button
        className="btn-primary flex-1"
        onClick={handleJoin}
        disabled={spotLeft === 0 || hasJoined}
      >
        {hasJoined ? "Joined" : spotLeft === 0 ? "Full" : "Join plan"}
      </button>

      <button
        className="btn-secondary"
        onClick={handleLeave}
        disabled={!hasJoined}
      >
        Leave
      </button>
    </div>
  </article>
);
}
