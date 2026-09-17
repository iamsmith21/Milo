import request from "supertest";
import app from "../index.js";
import jwt from "jsonwebtoken";

describe("Plan Controller", () => {
  const fakeToken = jwt.sign(
    {
      userId: 999,
    },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: "1h" },
  );

  it("should block requests that dont have a token", async () => {
    const response = await request(app).get("/api/plans");

    expect(response.status).toBe(401);
  });

  it("should fetch the plans if a valid token is provided", async () => {
    const response = await request(app)
      .get("/api/plans")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
