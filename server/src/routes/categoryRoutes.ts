import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createCategory,
  getAllCategorys,
  //getCategoryByCategoryTitle, use if getting Category with CategoryTitle instead of ID
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.post("/category", isAuthenticated, createCategory);
categoryRouter.get("/categorys", isAuthenticated, getAllCategorys);
categoryRouter.get("/category/:id", isAuthenticated, getCategoryById);
// Get category by categoryTitle:
// categoryRouter.get("/category/:categoryTitle", isAuthenticated, getCategoryByCategoryTitle);
categoryRouter.put("/category/:id", isAuthenticated, updateCategoryById);
categoryRouter.delete("/category/:id", isAuthenticated, deleteCategoryById);

export default categoryRouter;
