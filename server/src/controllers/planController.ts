import { Request, Response } from "express";
import PlanModel from "../models/Plan";

/* // Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await CategoryModel.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}; */

// Read all plans
export const getAllPlans = async (req: Request, res: Response) => {
  try {
    const plan = await PlanModel.find();
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single plan by ID
export const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const plan = await PlanModel.findById(id);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single plan by planTitle
export const getPlanByPlanTitle = async (req: Request, res: Response) => {
  const { planTitle } = req.params;

  try {
    const plan = await PlanModel.findOne({ planTitle });
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
/* 
// Update a category by ID
export const updatePlanById = async (req: Request, res: Response) => {
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
 */
