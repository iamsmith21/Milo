import { useMemo, useState } from "react";
import CategoryFilter from "../features/plans/components/CategoryFilter";
import PlanList from "../features/plans/components/PlanList";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import { motion } from "framer-motion";
import { apiFetch } from "../utils/api";
import { Search, X, Sparkles, MapPin } from "lucide-react";

function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const debouncedSearchQ = useDebounce(searchQ, 400);

  const {
    data: plans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await apiFetch("/api/plans");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchedCategory =
        selectedCategory === "all" || plan.category === selectedCategory;
      const matchesSearch =
        plan.title.toLowerCase().includes(debouncedSearchQ.toLowerCase()) ||
        plan.location.toLowerCase().includes(debouncedSearchQ.toLowerCase());

      return matchedCategory && matchesSearch;
    });
  }, [plans, selectedCategory, debouncedSearchQ]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div
          className="mb-5 h-12 w-12 animate-spin rounded-full border-4"
          style={{
            borderColor: "var(--color-line)",
            borderTopColor: "#FF5E3A",
          }}
        />
        <p
          className="text-xl font-extrabold text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Rounding up the plans…
        </p>
        <p className="mt-1 text-sm text-muted">Gathering local meetups and activities.</p>
      </div>
    );

  if (isError)
    return (
      <div className="py-20">
        <div className="mx-auto max-w-sm rounded-3xl border border-line bg-surface p-10 text-center shadow-lg">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md"
            style={{ background: "#FF5E3A" }}
          >
            !
          </div>
          <p
            className="text-xl font-bold text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Something went sideways
          </p>
          <p className="mt-2 text-sm text-muted">
            We couldn't load the plans right now. Check your connection and try again.
          </p>
        </div>
      </div>
    );

  return (
    <motion.div
      className="container py-8 sm:py-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <section aria-labelledby="explore-heading">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/15 px-3 py-1 text-xs font-bold text-[#10B981]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]"></span>
              </span>
              <span>Live Local Plans</span>
            </div>

            <h1
              id="explore-heading"
              className="text-3xl sm:text-5xl font-black tracking-tight text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What's happening
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-muted max-w-lg">
              Pickup games, casual coffee, rooftop drinks, and weekend hikes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end">
            <span className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-black uppercase tracking-wider text-ink shadow-sm">
              {filteredPlans.length} {filteredPlans.length === 1 ? "Plan" : "Plans"} Available
            </span>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted" />
            <input
              type="text"
              placeholder="Search by activity name or city (e.g. Badminton, Riverside, Cafe)..."
              className="w-full rounded-2xl border border-line bg-surface py-4 pl-12 pr-12 text-sm text-ink outline-none transition-all placeholder:text-muted/60 focus:border-[#FF5E3A] focus:ring-2 focus:ring-[#FF5E3A]/20 shadow-sm hover:border-muted/50"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
            {searchQ && (
              <button
                type="button"
                onClick={() => setSearchQ("")}
                className="absolute right-4 rounded-full p-1 text-muted hover:bg-surface-warm hover:text-ink transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <PlanList plans={filteredPlans} />
      </section>
    </motion.div>
  );
}

export default ExplorePage;
