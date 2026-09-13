import express from "express";
import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
} from "../controllers/planController.js";

const router = express.Router();

router.get("/", getAllPlans);
router.post("/", createPlan);
router.get("/:planId", getPlanById);
router.patch("/:planId", updatePlan);

export default router;
