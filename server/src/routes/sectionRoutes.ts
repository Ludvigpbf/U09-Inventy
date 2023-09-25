import express from "express";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import {
  createSection,
  getAllSections,
  getSectionBySectionTitle,
  getSectionById,
  updateSectionById,
  deleteSectionById,
} from "../controllers/sectionController";
import SectionModel from "../models/Section";

const sectionRouter = express.Router();

sectionRouter.post("/section", isAuthenticated, createSection);
sectionRouter.get(
  "/sections",
  isAuthenticated,
  isAuthorizedAllResources(SectionModel),
  getAllSections
);
sectionRouter.get(
  "/section/:id",
  isAuthenticated,
  isAuthorizedById(SectionModel),
  getSectionById
);
sectionRouter.get(
  "/section/title/:sectionTitle",
  isAuthenticated,
  isAuthorizedByTitle(SectionModel, "sectionTitle"),
  getSectionBySectionTitle
);
sectionRouter.put(
  "/section/:id",
  isAuthenticated,
  isAuthorizedById(SectionModel),
  updateSectionById
);
sectionRouter.delete(
  "/section/:id",
  isAuthenticated,
  isAuthorizedById(SectionModel),
  deleteSectionById
);

export default sectionRouter;
