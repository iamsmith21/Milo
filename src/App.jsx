import { useState } from "react";
import PlanCard from "./components/PlanCard";
import "./App.css";

function App() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      title: "Evening Badminton",
      location: "Etobicoke",
      capacity: 4,
      category: "sport",
      confirmedPlayers: 2,
      hasJoined: false,
    },
    {
      id: 2,
      title: "Coffee",
      location: "Toronto",
      capacity: 2,
      category: "social",
      confirmedPlayers: 2,
      hasJoined: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredPlans = plans.filter((plan) => {
    if (selectedCategory === "all") {
      return true;
    }

    return plan.category === selectedCategory;
  });

  function handleJoin(planid) {
    setPlans((prevPlan) => {
      return prevPlan.map((plan) => {
        if (plan.id !== planid) {
          return plan;
        }

        if (plan.hasJoined || plan.confirmedPlayers >= plan.capacity) {
          return plan;
        }
        return {
          ...plan,
          confirmedPlayers: plan.confirmedPlayers + 1,
          hasJoined: true,
        };
      });
    });
  }

  function handleLeave(planid) {
    setPlans((prevPlan) => {
      return prevPlan.map((plan) => {
        if (plan.id !== planid) {
          return plan;
        }

        return {
          ...plan,
          confirmedPlayers: plan.confirmedPlayers - 1,
          hasJoined: false,
        };
      });
    });
  }
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1 className="wordmark">
          milo<span className="text-ink">.</span>
        </h1>
        <p className="tagline">Find people. Make Plans.</p>
      </header>

      <section className="mb-12 max-w-2xl">
        <p className="badge mb-5">
          A little company. A lot more possibilities.
        </p>

        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Good plans start with{" "}
          <span className="text-brand">good company.</span>
        </h2>
        <p className="mt-5 max-w-lg text-lg text-muted">
          A badminton partner, a coffee companion, or a few new faces. Find your
          next plan on Milo.
        </p>
      </section>

      <section aria-labelledby="explore-heading">
        <div className="mb-6 border-b border-line pb-4">
          <h2 id="explore-heading" className="section-title mb-1">
            Explore plans
          </h2>
          <p className="text-sm text-muted">
            Find something you would love to join.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "sport", "social"].map((item) => {
            return (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={
                  selectedCategory === item ? "btn-primary" : "btn-secondary"
                }
              >
                {item.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="plans-grid">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              handleLeave={handleLeave}
              handleJoin={handleJoin}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
