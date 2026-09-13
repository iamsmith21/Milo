import { useState } from "react";
import CategoryFilter from "../features/plans/components/CategoryFilter";
import PlanList from "../features/plans/components/PlanList";
import { useQuery } from "@tanstack/react-query";
import { usePlans } from "../context/PlansContext";

function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { handleJoin, handleLeave } = usePlans();
  const [searchQ, setSearchQ] = useState("");

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
    return <div className="py-20 text-center">Loading plans...</div>;
  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load plans!
      </div>
    );

  //using Classic useEffect => problem :screen flickers for a sec until data arrives from DB

  // const [plans, setPlans] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/plans")
  //     .then((repsonse) => repsonse.json())
  //     .then((data) => {
  //       setPlans(data);
  //       setLoading(false);
  //     });
  // }, []);
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
