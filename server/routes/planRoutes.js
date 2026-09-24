import express from "express";

import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPlans);
router.post("/", verifyToken, createPlan);
router.get("/:planId", verifyToken, getPlanById);
router.delete("/:planId", verifyToken, deletePlan);
router.patch("/:planId", verifyToken, updatePlan);


export default router;
