import express from "express";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import {
  createPeriod,
  getAllPeriods,
  getPeriodById,
  getPeriodByPeriodTitle,
  updatePeriodById,
  deletePeriodById,
  deletePeriodsByIds,
} from "../controllers/periodController";
import SectionModel from "../models/Section";
import PeriodModel from "../models/Period";

const periodRouter = express.Router();

periodRouter.post("/period", isAuthenticated, createPeriod);
periodRouter.get(
  "/periods",
  isAuthenticated,
  isAuthorizedAllResources(PeriodModel),
  getAllPeriods
);
periodRouter.get(
  "/supplier/:id",
  isAuthenticated,
  isAuthorizedById(PeriodModel),
  getPeriodById
);
periodRouter.get(
  "/period/title/:periodTitle",
  isAuthenticated,
  isAuthorizedByTitle(PeriodModel, "periodTitle"),
  getPeriodByPeriodTitle
);
periodRouter.put(
  "/period/:id",
  isAuthenticated,
  isAuthorizedById(PeriodModel),
  updatePeriodById
);
periodRouter.delete(
  "/period/:id",
  isAuthenticated,
  isAuthorizedById(PeriodModel),
  deletePeriodById
);
periodRouter.delete(
  "/periods/delete",
  isAuthenticated,
  isAuthorizedAllResources(PeriodModel),
  deletePeriodsByIds
);

export default periodRouter;
