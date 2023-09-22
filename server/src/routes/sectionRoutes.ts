import express from "express";
import {
  createSection,
  getAllSections,
  //getSectionBySectionName, use if getting Section with SectionName instead of ID
  getSectionById,
  updateSectionById,
  deleteSectionById,
} from "../controllers/sectionController";

const sectionRouter = express.Router();

sectionRouter.post("/section", createSection);
sectionRouter.get("/sections", getAllSections);
sectionRouter.get("/section/:id", getSectionById);
// Get section by sectionName:
// sectionRouter.get("/section/:sectionTitle", getSectionBySectionTitle);
sectionRouter.put("/section/:id", updateSectionById);
sectionRouter.delete("/section/:id", deleteSectionById);

export default sectionRouter;
