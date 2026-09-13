import { Link, useParams } from "react-router";
import { usePlans } from "../context/PlansContext";

export default function PlanDetailPage() {
  const { id } = useParams();

  const { plans } = usePlans();

  const plan = plans.find((p) => String(p.id) === String(id));

  if (!plan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Plan not found</h2>
        <Link to="/explore" className="text-brand hover:underline mt-4 block">
          Go back to explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Link
        to="/explore"
        className="text-sm text-muted hover:text-ink mb-6 inline-block"
      >
        ← Back to all plans
      </Link>

      <div className="rounded-4xl border border-line bg-surface p-8">
        <span className="badge mb-4">{plan.category}</span>
        <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
        <p className="text-lg text-muted mb-6">📍 {plan.location}</p>
        <div className="flex items-center gap-4 py-6 border-y border-line">
          <div>
            <p className="text-sm text-muted">Capacity</p>
            <p className="font-semibold">
              {plan.confirmedPlayers} / {plan.capacity}
            </p>
          </div>
          {/* TODO: We will add a join button here later! */}
        </div>
      </div>
    </div>
  );
}
