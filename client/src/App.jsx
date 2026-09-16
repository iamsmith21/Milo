import AppLayout from "./components/layout/AppLayout";
import ExplorePage from "./pages/ExplorePage";
import LoginPage from "./pages/LoginPage";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes, useLocation } from "react-router";
import CreatePlanForm from "./features/plans/components/CreatePlanForm";
import PlanDetailPage from "./pages/PlanDetailpage";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./pages/SignupPage";

export default function App() {
  const location = useLocation();

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePlanForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan/:id"
            element={
              <ProtectedRoute>
                <PlanDetailPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AnimatePresence>
    </AppLayout>
  );
}
