import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { PlansProvider } from "./context/PlansContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PlansProvider>
            <App />
          </PlansProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>,
);
