import express from "express";

import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
} from "../controllers/planController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPlans);
router.post("/", verifyToken, createPlan);
router.get("/:planId", verifyToken, getPlanById);
router.patch("/:planId", verifyToken, updatePlan);

export default router;
