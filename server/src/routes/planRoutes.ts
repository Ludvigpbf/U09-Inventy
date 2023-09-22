import express from "express";
import {
  /*   createCategory, */
  getAllPlans,
  //getPlanByPlanTitle, use if getting Plan with PlanTitle instead of ID
  getPlanById,
  /*   updatePlanById,
  deletePlanById, */
} from "../controllers/planController";

const planRouter = express.Router();

/* planRouter.post("/plan", createPlan); */
planRouter.get("/plans", getAllPlans);
planRouter.get("/plan/:id", getPlanById);
// Get plan by categoryTitle:
// categoryRouter.get("/plan/:categoryTitle", getPlanByPlanTitle);
/* categoryRouter.put("/plan/:id", updatePlanById);
categoryRouter.delete("/plan/:id", deletePlanById); */

export default planRouter;
