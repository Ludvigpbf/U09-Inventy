import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createPeriod,
  getAllPeriods,
  //getPeriodByPeriodTitle, use if getting Period with PeriodTitle instead of ID
  getPeriodById,
  updatePeriodById,
  deletePeriodById,
  deletePeriodsByIds,
} from "../controllers/periodController";

const periodRouter = express.Router();

periodRouter.post("/period", isAuthenticated, createPeriod);
periodRouter.get("/periods", isAuthenticated, getAllPeriods);
periodRouter.get("/supplier/:id", isAuthenticated, getPeriodById);
// Get supplier by periodTitle:
// periodRouter.get("/period/:periodTitle",isAuthenticated, getPeriodByPeriodTitle);
periodRouter.put("/period/:id", isAuthenticated, updatePeriodById);
periodRouter.delete("/period/:id", isAuthenticated, deletePeriodById);
periodRouter.delete("/periods/delete", isAuthenticated, deletePeriodsByIds);

export default periodRouter;
