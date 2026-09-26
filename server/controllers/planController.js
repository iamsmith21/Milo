import prisma from "../config/db.js";

// GET /api/plans
export const getAllPlans = async (req, res) => {
  try {
    const allPlans = await prisma.plan.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
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

      include: {
        messages: {
          include: { user: true },
          orderBy: { createdAt: "asc" },
        },
      },
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
    const { title, location, capacity, category, time, date, description } =
      req.body;

    const newPlan = await prisma.plan.create({
      data: {
        title,
        location,
        capacity: Number(capacity),
        category,
        authorId: req.user.userId,
        time,
        date,
        description,
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

export const deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { userId } = req.user;

    const plan = await prisma.plan.findUnique({
      where: { id: Number(planId) },
    });

    if (!plan) {
      return res.status(404).json({
        error: "Plan not found",
      });
    }

    if (plan.authorId != userId) {
      return res
        .status(403)
        .json({ error: "Access Denied : You do not own this plan." });
    }

    await prisma.message.deleteMany({
      where: { planId: Number(planId) },
    });

    await prisma.plan.delete({
      where: { id: Number(planId) },
    });

    res.json({ message: "Plan successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete plan" });
  }
};

export const joinPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { userId } = req.user;

    await prisma.planParticipant.create({
      data: {
        planId: Number(planId),
        userId: userId,
      },
    });

    // doing the count
    await prisma.plan.update({
      where: {
        id: Number(planId),
      },
      data: {
        confirmedPlayers: { increment: 1 },
      },
    });

    res.json({ message: "Successfully joined the plan!" });
  } catch (error) {
    console.error("JOIN PLAN ERROR:", error);
    res
      .status(400)
      .json({ error: "You already joined this plan or it failed." });
  }
};

export const leavePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { userId } = req.user;

    await prisma.planParticipant.delete({
      where: {
        planId_userId: {
          planId: Number(planId),
          userId: userId,
        },
      },
    });

    // doing the count
    await prisma.plan.update({
      where: {
        id: Number(planId),
      },
      data: {
        confirmedPlayers: { decrement: 1 },
      },
    });

    res.json({ message: "Successfully left the plan!" });
  } catch (error) {
    console.error("LEAVE PLAN ERROR:", error);
    res.status(400).json({ error: "Failed to leave plan." });
  }
};
