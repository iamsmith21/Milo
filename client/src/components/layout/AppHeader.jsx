import { NavLink, Link } from "react-router";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link
          to="/"
          aria-label="Milo home"
          className="wordmark transition-opacity hover:opacity-75"
        >
          milo<span style={{ color: "var(--color-coral)" }}>.</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-md px-3.5 py-2 text-sm font-semibold transition-colors duration-150 ${
                isActive
                  ? "text-green"
                  : "text-muted hover:text-ink"
              }`
            }
            style={({ isActive }) =>
              isActive ? { background: "var(--color-green-subtle)", color: "var(--color-green)" } : {}
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `rounded-md px-3.5 py-2 text-sm font-semibold transition-colors duration-150 ${
                isActive
                  ? ""
                  : "text-muted hover:text-ink"
              }`
            }
            style={({ isActive }) =>
              isActive ? { background: "var(--color-green-subtle)", color: "var(--color-green)" } : {}
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/create"
            className="btn-coral !min-h-9 !rounded-md !px-4 !py-1.5 !text-xs"
          >
            New plan
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
