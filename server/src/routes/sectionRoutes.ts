import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createSection,
  getAllSections,
  //getSectionBySectionName, use if getting Section with SectionName instead of ID
  getSectionById,
  updateSectionById,
  deleteSectionById,
} from "../controllers/sectionController";

const sectionRouter = express.Router();

sectionRouter.post("/section", isAuthenticated, createSection);
sectionRouter.get("/sections", isAuthenticated, getAllSections);
sectionRouter.get("/section/:id", isAuthenticated, getSectionById);
// Get section by sectionName:
// sectionRouter.get("/section/:sectionTitle",isAuthenticated, getSectionBySectionTitle);
sectionRouter.put("/section/:id", isAuthenticated, updateSectionById);
sectionRouter.delete("/section/:id", isAuthenticated, deleteSectionById);

export default sectionRouter;
