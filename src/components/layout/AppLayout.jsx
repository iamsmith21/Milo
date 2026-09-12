import AppHeader from "./AppHeader";

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
