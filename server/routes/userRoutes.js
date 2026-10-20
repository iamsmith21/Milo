import express from "express";
import prisma from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/me/plans
router.get("/me/plans", verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;

    const userPlans = await prisma.plan.findMany({
      where: { authorId: id },
      orderBy: { createdAt: "desc" },
      include: {
        participants: {
          include: {
            user: true
          }
        },
      },
    });

    res.json(userPlans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user plans" });
  }
});

// To get Plans the user has joined 

// GET /api/users/me/joined-plans

router.get("/me/joined-plans", verifyToken, async (req, res) => {
  try {
    const id = req.user.userId

    const userJoinedPlans = await prisma.plan.findMany({
      where: {
        participants: {
          some: {
            userId: id
          }
        }
      },
      orderBy: { createdAt: "desc" },
      include: {
        participants: {
          include: {
            user: true
          }
        }
      }
    })

    res.json(userJoinedPlans)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user joined plans." })
  }
})


export default router;
