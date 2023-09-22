import { Request, Response } from "express";
import ListModel from "../models/List"; // Import the List model

// Create a new list
export const createList = async (req: Request, res: Response) => {
  // Create a new list using the ListModel and request body data
  try {
    const newList = await ListModel.create(req.body);
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all lists
export const getAllLists = async (req: Request, res: Response) => {
  try {
    const list = await ListModel.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single list by ID
export const getListById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const list = await ListModel.findById(id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single list by listTitle
export const getListByListTitle = async (req: Request, res: Response) => {
  const { listTitle } = req.params;

  try {
    const list = await ListModel.findOne({ listTitle });
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a list by ID
export const updateListById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { listTitle, listDescription, listSection, listImage, listItem } =
    req.body;

  try {
    const list = await ListModel.findByIdAndUpdate(
      id,
      { listTitle, listDescription, listSection, listImage, listItem },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a list by ID
export const deleteListById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const list = await ListModel.findByIdAndDelete(id);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
