import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/api";
import PlanList from "../features/plans/components/PlanList";
import { useState } from "react";
import CategoryFilter from "../features/plans/components/CategoryFilter";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("created")

  const {
    data: createdPlans = [],
    isLoading: isLoadingCreated,
    isError: isErrorCreated,
  } = useQuery({
    queryKey: ["userPlans"],
    queryFn: async () => {
      const response = await apiFetch("/api/users/me/plans");
      if (!response.ok) throw new Error("Failed to fetch user plans");
      return response.json();
    },
  });

  const {
    data: joinedPlans = [],
    isLoading: isLoadingJoined,
    isError: isErrorJoined
  } = useQuery({
    queryKey: ["joinedPlans"],
    queryFn: async () => {
      const response = await apiFetch("/api/users/me/joined-plans")
      if (!response.ok) throw new Error("Failed to fetch user joined plans")
      return response.json()
    }
  })

  const currentPlans = activeTab === "created" ? createdPlans : joinedPlans
  const isLoading = activeTab === "created" ? isLoadingCreated : isLoadingJoined
  const isError = activeTab === "created" ? isErrorCreated : isErrorJoined

  const filteredPlans = currentPlans.filter((plan) => {
    if (activeCategory === "all") {
      return true;
    }
    return plan.category === activeCategory;
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


      <div className="mb-8 inline-flex items-center gap-1.5 rounded-2xl border border-line bg-surface-warm p-1.5">
        <button onClick={() => setActiveTab("created")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all duration-150 ${activeTab === "created" ? "bg-surface text-ink font-bold shadow-sm" : "text-muted hover:text-ink font-semibold"}`}>
          Created Plans <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${activeTab === "created"
              ? "bg-coral/10 text-coral"
              : "bg-line text-muted"
              }`}
          >{createdPlans.length}</span>
        </button>
        <button onClick={() => setActiveTab("joined")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all duration-150 ${activeTab === "joined" ? "bg-surface text-ink font-bold shadow-sm" : "text-muted hover:text-ink font-semibold"}`}>
          Joined Plans <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${activeTab === "joined"
              ? "bg-coral/10 text-coral"
              : "bg-line text-muted"
              }`}
          >{joinedPlans.length}</span>
        </button>
      </div>

      {isLoading ? (
        <p className="text-muted">Loading your plans...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load plans.</p>
      ) : currentPlans.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-10 text-center">
          <p className="text-muted">
            {activeTab === "created" ? "You haven't created any plans yet."
              : "You haven't joined any plans yet. Go explore and jump into one!"}
          </p>
        </div>
      ) : (
        <>
          <CategoryFilter
            selectedCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <PlanList plans={filteredPlans} />
        </>
      )}
    </motion.div>
  );
}
