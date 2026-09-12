import AppLayout from "./components/layout/AppLayout";
import ExplorePage from "./pages/ExplorePage";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router";
import { useState } from "react";

export default function App() {
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

        if (!plan.hasJoined) return plan;

        return {
          ...plan,
          confirmedPlayers: plan.confirmedPlayers - 1,
          hasJoined: false,
        };
      });
    });
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/explore"
          element={
            <ExplorePage
              plans={plans}
              handleJoin={handleJoin}
              handleLeave={handleLeave}
            />
          }
        />
      </Routes>
    </AppLayout>
  );
}
