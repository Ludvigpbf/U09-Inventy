import express from "express";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import {
  createCategory,
  getAllCategorys,
  getCategoryByCategoryTitle,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController";
import CategoryModel from "../models/Category";

const categoryRouter = express.Router();

categoryRouter.post("/category", isAuthenticated, createCategory);
categoryRouter.get(
  "/categories",
  isAuthenticated,
  isAuthorizedAllResources(CategoryModel),
  getAllCategorys
);
categoryRouter.get(
  "/category/:id",
  isAuthenticated,
  isAuthorizedById(CategoryModel),
  getCategoryById
);
categoryRouter.get(
  "/category/title/:categoryTitle",
  isAuthenticated,
  isAuthorizedByTitle(CategoryModel, "categoryTitle"),
  getCategoryByCategoryTitle
);
categoryRouter.put(
  "/category/:id",
  isAuthenticated,
  isAuthorizedById(CategoryModel),
  updateCategoryById
);
categoryRouter.delete(
  "/category/:id",
  isAuthenticated,
  isAuthorizedById(CategoryModel),
  deleteCategoryById
);

export default categoryRouter;
