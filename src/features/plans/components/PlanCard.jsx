export default function PlanCard({ plan, handleJoin, handleLeave }) {
  const { confirmedPlayers, hasJoined } = plan;
  const spotLeft = plan.capacity - confirmedPlayers;

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
          onClick={() => handleJoin(plan.id)}
          disabled={spotLeft === 0 || hasJoined}
        >
          {hasJoined ? "Joined" : spotLeft === 0 ? "Full" : "Join plan"}
        </button>

        <button
          className="btn-secondary"
          onClick={() => handleLeave(plan.id)}
          disabled={!hasJoined}
        >
          Leave
        </button>
      </div>
    </article>
  );
}
