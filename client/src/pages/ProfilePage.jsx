import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/api";
import PlanList from "../features/plans/components/PlanList";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user } = useAuth();

  const {
    data: plans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPlans"],
    queryFn: async () => {
      const response = await apiFetch(
        "http://localhost:3000/api/users/me/plans",
      );
      if (!response.ok) throw new Error("Failed to fetch user plans");
      return response.json();
    },
  });

  return (
    <motion.div
      className="container py-10 sm:py-14"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 rounded-xl border border-line bg-surface p-8 shadow-sm">
        <h1
          className="text-3xl font-extrabold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {user?.name}'s Dashboard
        </h1>
        <p className="mt-2 text-muted">{user?.email}</p>
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
        <h2 className="text-xl font-bold">Plans You Created</h2>
        <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
          {plans.length}
        </span>
      </div>

      {isLoading ? (
        <p className="text-muted">Loading your plans...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load plans.</p>
      ) : plans.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-10 text-center">
          <p className="text-muted">You haven't created any plans yet.</p>
        </div>
      ) : (
        <PlanList plans={plans} />
      )}
    </motion.div>
  );
}
