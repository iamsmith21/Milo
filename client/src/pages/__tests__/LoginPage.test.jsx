import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthProvider from "../../context/AuthContext";
import LoginPage from "../LoginPage";

describe("Login Page", () => {
  it("renders the login form correctly", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    const heading = screen.getByText("Welcome Back");

    expect(heading).toBeInTheDocument();
  });
});
