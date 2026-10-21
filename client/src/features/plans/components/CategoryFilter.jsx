const categories = [
  { key: "all", label: "All Vibes", icon: "✨", color: "#10B981" },
  { key: "sport", label: "Sport", icon: "🏀", color: "#FF5E3A" },
  { key: "social", label: "Social", icon: "☕", color: "#6366F1" },
  { key: "life", label: "Life", icon: "🌿", color: "#10B981" },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2.5">
      {categories.map(({ key, label, icon, color }) => {
        const isActive = selectedCategory === key;
        return (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? "text-white shadow-md scale-[1.03]"
                : "border border-line bg-surface text-muted hover:text-ink hover:border-muted/50 hover:bg-surface-warm"
            }`}
            style={
              isActive
                ? { background: color, borderColor: color }
                : {}
            }
          >
            <span className="text-sm leading-none transition-transform group-hover:scale-125">{icon}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
