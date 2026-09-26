import express from "express";

import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  joinPlan,
  leavePlan
} from "../controllers/planController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllPlans);
router.post("/", verifyToken, createPlan);
router.get("/:planId", verifyToken, getPlanById);
router.delete("/:planId", verifyToken, deletePlan);
router.patch("/:planId", verifyToken, updatePlan);
router.post("/:planId/join", verifyToken, joinPlan);
router.delete("/:planId/leave", verifyToken, leavePlan);


export default router;
