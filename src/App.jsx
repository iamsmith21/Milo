import { useState } from "react";
import PlanCard from "./components/PlanCard";
import "./App.css";

function App() {
  let plans = [
    {
      id: 1,
      title: "Evening Badminton",
      location: "Etobicoke",
      capacity: 4,
    },
    {
      id: 2,
      title: "Coffee",
      location: "Toronto",
      capacity: 2,
    },
  ];

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


        <div className="plans-grid">
          {plans.map((plan) => (
            <PlanCard plan={plan} key={plan.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
