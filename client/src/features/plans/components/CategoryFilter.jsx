const categories = [
  { key: "all",    label: "All" },
  { key: "sport",  label: "Sport" },
  { key: "social", label: "Social" },
  { key: "life",   label: "Life" },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-7 flex flex-wrap gap-2">
      {categories.map(({ key, label }) => {
        const isActive = selectedCategory === key;
        return (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-150 ${
              isActive
                ? "text-white shadow-sm"
                : "border border-line bg-surface text-muted hover:text-ink"
            }`}
            style={
              isActive
                ? { background: "var(--color-green)" }
                : {}
            }
          >
            {key !== "all" && <span className="cat-dot" data-cat={key} />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
