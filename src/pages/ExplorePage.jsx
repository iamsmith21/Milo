import { useState } from "react";
import CategoryFilter from "../features/plans/components/CategoryFilter";
import PlanList from "../features/plans/components/PlanList";

function ExplorePage({ plans, handleJoin, handleLeave }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchQ, setSearchQ] = useState("");
  const filteredPlans = plans.filter((plan) => {
    let matchedCategory =
      selectedCategory === "all" || plan.category === selectedCategory;

    let matchesSearch = plan.title
      .toLowerCase()
      .includes(searchQ.toLowerCase());
    return matchedCategory && matchesSearch;
  });

  return (
    <>
      <section aria-labelledby="explore-heading">
        <div className="mb-6 border-b border-line pb-4">
          <h2 id="explore-heading" className="section-title mb-1">
            Explore plans
          </h2>
          <p className="text-sm text-muted">
            Find something you would love to join.
          </p>
        </div>

        <input
          type="search"
          placeholder="Search plans"
          className="field mb-4"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />

        <p>You types: {searchQ}</p>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <PlanList
          plans={filteredPlans}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      </section>
    </>
  );
}

export default ExplorePage;
