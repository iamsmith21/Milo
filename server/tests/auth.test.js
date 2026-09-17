import request from "supertest";
import app from "../index.js";
import prisma from "../config/db.js";

describe("Auth Controller", () => {
  const testEmail = `test_${Date.now()}@example.com`;

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: testEmail },
    });
    await prisma.$disconnect();
  });

  it("should successfully create new user", async () => {
    // We do AAA
    // 1. Arrange
    const newUserData = {
      name: "Test User",
      email: testEmail,
      password: "password123",
    };

    // 2. ACT
    const response = await request(app)
      .post("/api/auth/signup")
      .send(newUserData);

    // 3. ASSERT
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(testEmail);
  });

  it("should successfully login user", async () => {
    const data = {
      email: testEmail,
      password: "password123",
    };

    const response = await request(app).post("/api/auth/login").send(data);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.email).toBe(testEmail);
  });
});
