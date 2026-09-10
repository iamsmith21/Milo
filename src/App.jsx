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
    <>
      {plans.map((plan) => (
        <PlanCard plan={plan} key={plan.id} />
      ))}
    </>
  );
}

export default App;
