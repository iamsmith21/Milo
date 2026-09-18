import AppHeader from "./AppHeader";

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="pt-28">{children}</main>

      <footer
        className="border-t border-line"
        style={{ background: "var(--color-surface-warm)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <div>
            <span
              className="text-lg font-extrabold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-green)",
              }}
            >
              milo<span style={{ color: "var(--color-coral)" }}>.</span>
            </span>
            <p className="mt-1 text-xs text-muted">
              Where good plans find good people.
            </p>
          </div>
          <p className="text-xs text-muted">
            Made for people who'd rather do things than scroll about them.
          </p>
        </div>
      </footer>
    </div>
  );
}
