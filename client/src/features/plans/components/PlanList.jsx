import PlanCard from "./PlanCard";

export default function PlanList({ plans }) {
  return (
    <div className="plans-grid">
      {plans.length > 0 ? (
        plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
          />
        ))
      ) : (
        <div className="col-span-full rounded-2xl border border-dashed border-line bg-surface/60 p-12 text-center">
          <p className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
            No plans found
          </p>
          <p className="mt-1 text-xs text-muted">
            Be the first one to start something here!
          </p>
        </div>
      )}
    </div>
  );
}
