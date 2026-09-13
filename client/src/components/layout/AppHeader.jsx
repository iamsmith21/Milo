import { NavLink, Link } from "react-router";

export default function AppHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-6">
      <Link to="/" aria-label="Milo home" className="wordmark">
        milo<span className="text-ink">.</span>
      </Link>

      <nav aria-label="Main navigation" className="flex items-center gap-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded-control px-4 py-2 text-sm font-medium ${
              isActive
                ? "bg-accent text-ink"
                : "text-muted hover:bg-surface hover:text-brand"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `rounded-control px-4 py-2 text-sm font-medium ${
              isActive
                ? "bg-accent text-ink"
                : "text-muted hover:bg-surface hover:text-brand"
            }`
          }
        >
          Explore Plans
        </NavLink>
      </nav>
    </header>
  );
}
