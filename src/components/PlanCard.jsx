import { useState } from "react";

export default function PlanCard({ plan }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);

  const spotLeft = plan.capacity - confirmedPlayers;

  const handleLeave = () => {
    setConfirmedPlayers((prev) => Math.max(prev - 1, 0));
    setHasJoined(false);
  };

  const handleJoin = () => {
    setConfirmedPlayers(Math.min(confirmedPlayers + 1, plan.capacity));
    setHasJoined(true);
  };

  return (
    <main>
      <h1>Milo</h1>
      <p>Find people. Make Plans.</p>

      <h2>{plan.title}</h2>
      <p>{plan.location}</p>
      <p>{spotLeft} spots left!</p>
      <button disabled={spotLeft === 0 || hasJoined} onClick={handleJoin}>
        {spotLeft === 0 ? "Full" : "Join plan"}
      </button>

      <button
        onClick={handleLeave}
        disabled={spotLeft === plan.capacity || !hasJoined}
      >
        Leave Plan
      </button>

      <h1>Am I in? {hasJoined ? "Yes" : "No"}</h1>
    </main>
  );
}
