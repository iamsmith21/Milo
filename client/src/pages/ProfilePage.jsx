import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/api";
import PlanList from "../features/plans/components/PlanList";
import { useState } from "react";
import CategoryFilter from "../features/plans/components/CategoryFilter";
import { Link } from "react-router";
import { Plus, Compass, Calendar, Users } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("created");

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
    isError: isErrorJoined,
  } = useQuery({
    queryKey: ["joinedPlans"],
    queryFn: async () => {
      const response = await apiFetch("/api/users/me/joined-plans");
      if (!response.ok) throw new Error("Failed to fetch user joined plans");
      return response.json();
    },
  });

  const currentPlans = activeTab === "created" ? createdPlans : joinedPlans;
  const isLoading = activeTab === "created" ? isLoadingCreated : isLoadingJoined;
  const isError = activeTab === "created" ? isErrorCreated : isErrorJoined;

  const filteredPlans = currentPlans.filter((plan) => {
    if (activeCategory === "all") {
      return true;
    }
    return plan.category === activeCategory;
  });

  return (
    <motion.div
      className="container py-8 sm:py-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/70 pb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FF5E3A] to-[#6366F1] text-xl font-black text-white shadow-sm">
            {user?.name?.charAt(0).toUpperCase() || "M"}
          </div>
          <div>
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {user?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted">
              <span>{user?.email}</span>
              <span>·</span>
              <span className="font-semibold text-ink">{createdPlans.length} created</span>
              <span>·</span>
              <span className="font-semibold text-ink">{joinedPlans.length} joined</span>
            </div>
          </div>
        </div>

        <Link
          to="/create"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:brightness-110 active:scale-95 self-start sm:self-auto"
          style={{ background: "#FF5E3A" }}
        >
          <Plus className="h-4 w-4" />
          Create New Plan
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex rounded-xl bg-surface-warm/80 p-1 border border-line/60">
          <button
            onClick={() => setActiveTab("created")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
              activeTab === "created"
                ? "bg-surface text-ink shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Created
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                activeTab === "created"
                  ? "bg-[#FF5E3A]/15 text-[#FF5E3A]"
                  : "bg-line/70 text-muted"
              }`}
            >
              {createdPlans.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("joined")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
              activeTab === "joined"
                ? "bg-surface text-ink shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Joined
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                activeTab === "joined"
                  ? "bg-[#6366F1]/15 text-[#6366F1]"
                  : "bg-line/70 text-muted"
              }`}
            >
              {joinedPlans.length}
            </span>
          </button>
        </div>

        <span className="text-xs font-semibold text-muted">
          {filteredPlans.length} {filteredPlans.length === 1 ? "plan" : "plans"} listed
        </span>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="mb-4 h-8 w-8 animate-spin rounded-full border-2"
            style={{
              borderColor: "var(--color-line)",
              borderTopColor: "#FF5E3A",
            }}
          />
          <p className="text-sm font-semibold text-muted">Loading your plans...</p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <p className="text-sm font-bold text-coral">Failed to load plans.</p>
        </div>
      ) : currentPlans.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface/50 p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-warm text-muted">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
            {activeTab === "created" ? "No plans created yet" : "No joined plans yet"}
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted">
            {activeTab === "created"
              ? "Got an activity in mind? Put it out there and see who joins."
              : "Explore upcoming meetups and jump into one."}
          </p>
          <div className="mt-5">
            <Link
              to={activeTab === "created" ? "/create" : "/explore"}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              style={{ background: activeTab === "created" ? "#FF5E3A" : "#6366F1" }}
            >
              {activeTab === "created" ? "Create a Plan" : "Explore Plans"}
            </Link>
          </div>
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
