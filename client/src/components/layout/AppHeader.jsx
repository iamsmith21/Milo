import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Plus, LogOut } from "lucide-react";

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
        className="pointer-events-auto flex w-full max-w-4xl items-center justify-between rounded-full px-6 py-3"
        style={{
          background: "rgba(253, 246, 238, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(232, 221, 208, 0.8)",
        }}
      >
        <Link
          to="/"
          aria-label="Milo home"
          className="group flex items-center text-2xl font-black tracking-tight transition-transform hover:scale-105"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-green)",
          }}
        >
          milo<span className="text-[#FF5E3A] transition-transform group-hover:scale-125">.</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1.5">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="relative rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200"
              style={({ isActive }) => ({
                color: isActive ? "white" : "var(--color-muted)",
                background: isActive ? "var(--color-green)" : "transparent",
                boxShadow: isActive ? "0 2px 8px rgba(45, 106, 79, 0.25)" : "none",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2.5">
              <NavLink
                to="/profilepage"
                className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF5E3A] to-[#6366F1] p-0.5 shadow-sm transition-transform hover:scale-105"
                title={`${user.name}'s Dashboard`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-surface text-xs font-black text-ink">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </NavLink>

              <NavLink
                to="/create"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md active:scale-95"
                style={{ background: "#FF5E3A" }}
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Plan</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-warm hover:text-red-500"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:brightness-110 active:scale-95"
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
