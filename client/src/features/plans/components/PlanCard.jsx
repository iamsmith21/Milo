import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

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
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <article className="plan-card">
      <Link to={`/plan/${plan.id}`} className="block">
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
      </Link>
      <div className="card-actions">
        <button
          className="btn-primary flex-1"
          onClick={() => joinMutation.mutate()}
          disabled={spotLeft === 0 || hasJoined}
        >
          {hasJoined ? "Joined" : spotLeft === 0 ? "Full" : "Join plan"}
        </button>

        <button
          className="btn-secondary"
          onClick={() => leaveMutation.mutate()}
          disabled={!hasJoined}
        >
          Leave
        </button>
      </div>
    </article>
  );
}
