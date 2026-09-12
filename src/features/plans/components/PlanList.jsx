import PlanCard from "./PlanCard";

export default function PlanList({ plans, onJoin, onLeave }) {
  return (
    <div className="plans-grid">
      {plans.length > 0 ? (
        plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            handleJoin={onJoin}
            handleLeave={onLeave}
          />
        ))
      ) : (
        <p className="empty-state col-span-full">No plans for this category!</p>
      )}
    </div>
  );
}
