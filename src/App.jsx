import AppLayout from "./components/layout/AppLayout";
import ExplorePage from "./pages/ExplorePage";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router";
import CreatePlanForm from "./features/plans/components/CreatePlanForm";
import PlanDetailPage from "./pages/PlanDetailpage";


export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/explore"
          element={
            <ExplorePage
            />
          }
        />
        <Route path="/create" element={<CreatePlanForm/>} />
        <Route path="/plan/:id" element={<PlanDetailPage />} />
      </Routes>
    </AppLayout>
  );
}
