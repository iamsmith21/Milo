export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {["all", "sport", "social", "life"].map((item) => {
        return (
          <button
            key={item}
            onClick={() => onCategoryChange(item)}
            className={
              selectedCategory === item ? "btn-primary" : "btn-secondary"
            }
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
