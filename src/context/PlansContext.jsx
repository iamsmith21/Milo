import { createContext, useState, useContext } from "react";

const PlansContext = createContext();

export function PlansProvider({ children }) {
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

  function handleAddPlan(planObj) {
    const fakeDBResponse = {
      ...planObj,
      id: Date.now(),
      confirmedPlayers: 1,
      hasJoined: false,
    };
    setPlans([...plans, fakeDBResponse]);
  }

  const valueToShare = {
    plans,
    handleJoin,
    handleLeave,
    handleAddPlan,
  };

  return (
    <PlansContext.Provider value={valueToShare}>
      {children}
    </PlansContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlans() {
  return useContext(PlansContext);
}
