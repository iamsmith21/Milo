import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/explore", label: "Explore", end: false },
];

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrollStyle, setScrollStyle] = useState({});

  useEffect(() => {
    const onScroll = () => {
      const s = Math.min(window.scrollY, 150);
      const progress = s / 150;
      setScrollStyle({
        opacity: 1 - progress,
        filter: `blur(${progress * 10}px)`,
        transform: `translateY(${-progress * 18}px) scale(${1 - progress * 0.04})`,
        pointerEvents: progress > 0.85 ? "none" : "auto",
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pb-2 pointer-events-none"
      style={{
        transition:
          "opacity 0.2s cubic-bezier(0.4,0,0.2,1), filter 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
        ...scrollStyle,
      }}
    >
      <div
        className="pointer-events-auto flex w-full max-w-3xl items-center justify-between rounded-2xl px-5 py-4"
        style={{
          background: "rgba(253, 246, 238, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <Link
          to="/"
          aria-label="Milo home"
          className="pl-1 text-2xl font-extrabold tracking-tight transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-green)",
          }}
        >
          milo<span style={{ color: "var(--color-coral)" }}>.</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-150"
              style={({ isActive }) => ({
                color: isActive ? "var(--color-green)" : "var(--color-muted)",
                background: isActive
                  ? "var(--color-green-subtle)"
                  : "transparent",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 pr-1">
          {user ? (
            <div className="flex items-center gap-2">
              <NavLink
              to="/profilepage"
                className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white"
                style={{ background: "var(--color-green)" }}
                title={user.name}
              >
                {user.name?.charAt(0).toUpperCase()}
              </NavLink>

              <NavLink
                to="/create"
                className="rounded-xl px-3.5 py-2 text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ background: "var(--color-coral)" }}
              >
                + Plan
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-xl px-3 py-2 text-xs font-semibold transition-colors"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-coral)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-muted)")
                }
              >
                Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
                style={{ color: "var(--color-muted)" }}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-xl px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ background: "var(--color-green)" }}
              >
                Join free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
