import { useState } from "react";
import CategoryFilter from "../features/plans/components/CategoryFilter";
import PlanList from "../features/plans/components/PlanList";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";

function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const debouncedSearchQ = useDebounce(searchQ, 500);

  const {
    data: plans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/plans");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <div
          className="mb-5 h-10 w-10 animate-spin rounded-full border-[3px]"
          style={{
            borderColor: "var(--color-line)",
            borderTopColor: "var(--color-green)",
          }}
        />
        <p
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Rounding up the plans…
        </p>
        <p className="mt-1 text-sm text-muted">Hang tight.</p>
      </div>
    );

  if (isError)
    return (
      <div className="py-20">
        <div className="mx-auto max-w-sm rounded-xl border border-line bg-surface p-10 text-center shadow-md">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ background: "var(--color-coral)" }}
          >
            !
          </div>
          <p
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Something went sideways
          </p>
          <p className="mt-2 text-sm text-muted">
            We couldn't load the plans. Check your connection and try again.
          </p>
        </div>
      </div>
    );

  const filteredPlans = plans.filter((plan) => {
    const matchedCategory =
      selectedCategory === "all" || plan.category === selectedCategory;
    const matchesSearch = plan.title
      .toLowerCase()
      .includes(debouncedSearchQ.toLowerCase());
    return matchedCategory && matchesSearch;
  });

  return (
    <div className="container py-10 sm:py-14">
      <section aria-labelledby="explore-heading">
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              id="explore-heading"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What's happening
            </h1>
            <p className="mt-1 text-muted">
              Real plans, real people, real soon.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted sm:pb-1">
            {filteredPlans.length}{" "}
            {filteredPlans.length === 1 ? "plan" : "plans"}
          </p>
        </div>

        <div className="relative mb-4">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "var(--color-muted)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search by name…"
            className="field w-full pl-10"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <PlanList plans={filteredPlans} />
      </section>
    </div>
  );
}

export default ExplorePage;
