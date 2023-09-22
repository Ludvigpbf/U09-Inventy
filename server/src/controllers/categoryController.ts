import { Request, Response } from "express";
import CategoryModel from "../models/Category";

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await CategoryModel.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all category
export const getAllCategorys = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single category by categoryTitle
export const getCategoryByCategoryTitle = async (
  req: Request,
  res: Response
) => {
  const { categoryTitle } = req.params;

  try {
    const category = await CategoryModel.findOne({ categoryTitle });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a category by ID
export const updateCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryId, categoryTitle } = req.body;
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        categoryId,
        categoryTitle,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a category by ID
export const deleteCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
