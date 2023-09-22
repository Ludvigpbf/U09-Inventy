import express from "express";
import {
  createCategory,
  getAllCategorys,
  //getCategoryByCategoryTitle, use if getting Category with CategoryTitle instead of ID
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.post("/category", createCategory);
categoryRouter.get("/categorys", getAllCategorys);
categoryRouter.get("/category/:id", getCategoryById);
// Get category by categoryTitle:
// categoryRouter.get("/category/:categoryTitle", getCategoryByCategoryTitle);
categoryRouter.put("/category/:id", updateCategoryById);
categoryRouter.delete("/category/:id", deleteCategoryById);

export default categoryRouter;
