import express from "express";
import { getAllPlans, getPlanById } from "../controllers/planController";

const planRouter = express.Router();

planRouter.get("/plans", getAllPlans);
planRouter.get("/plan/:id", getPlanById);

export default planRouter;
