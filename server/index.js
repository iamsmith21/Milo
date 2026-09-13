import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/plans", async (req, res) => {
  try {
    const allPlans = await prisma.plan.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(allPlans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

app.post("/api/plans", async (req, res) => {
  try {
    const { title, location, capacity, category } = req.body;

    const newPlan = await prisma.plan.create({
      data: {
        title,
        location,
        capacity: Number(capacity),
        category,
      },
    });

    res.json(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create plan" });
  }
});

app.get("/api/plans/:planId", async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await prisma.plan.findUnique({
      where: { id: Number(planId) },
    });

    if (!plan) {
      return res.status(404).json({ error: "No such plan found" });
    }

    res.json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create plan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
