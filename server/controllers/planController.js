import prisma from "../config/db.js";

// GET /api/plans
export const getAllPlans = async (req, res) => {
  try {
    const allPlans = await prisma.plan.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(allPlans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// GET /api/plans/:planId
export const getPlanById = async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch plan" });
  }
};

// POST /api/plans
export const createPlan = async (req, res) => {
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
};

// PATCH /api/plans/:planId
export const updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const updatedPlan = await prisma.plan.update({
      where: { id: Number(planId) },
      data: req.body, // In a production app, we would validate this body first!
    });

    res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update plan" });
  }
};
