import { Request, Response } from "express";
import ItemModel from "../models/Item";

// Create a new Item
export const createItem = async (req: Request, res: Response) => {
  try {
    const newItem = await ItemModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
// Create multiple items
export const createMultipleItems = async (req: Request, res: Response) => {
  const itemsToCreate = req.body;

  try {
    const createdItems = await ItemModel.create(itemsToCreate);
    res.status(201).json(createdItems);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all item
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const item = await ItemModel.find();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single item by ID
export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const item = await ItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single item by itemTitle
export const getItemByItemTitle = async (req: Request, res: Response) => {
  const { itemTitle } = req.params;

  try {
    const item = await ItemModel.findOne({ itemTitle });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a item by ID
export const updateItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    itemTitle,
    itemDescription,
    itemCategory,
    itemImage,
    itemSupplier,
    itemPrice,
    itemUnit,
    itemQuantity,
  } = req.body;
  try {
    const item = await ItemModel.findByIdAndUpdate(
      id,
      {
        itemTitle,
        itemDescription,
        itemCategory,
        itemImage,
        itemSupplier,
        itemPrice,
        itemUnit,
        itemQuantity,
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update multiple items
export const updateMultipleItems = async (req: Request, res: Response) => {
  const { itemsToUpdate } = req.body;

  try {
    if (!Array.isArray(itemsToUpdate)) {
      return res.status(400).json({ error: "Invalid itemsToUpdate format" });
    }

    const updatedItems = [];

    for (const itemData of itemsToUpdate) {
      const { itemId, ...updateData } = itemData;

      const item = await ItemModel.findByIdAndUpdate(itemId, updateData, {
        new: true,
      });

      if (!item) {
        continue;
      }

      updatedItems.push(item);
    }

    res.json({ message: "Items updated successfully", updatedItems });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a item by ID
export const deleteItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const item = await ItemModel.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteMultipleItems = async (req: Request, res: Response) => {
  const { itemIds } = req.body;

  try {
    if (!Array.isArray(itemIds)) {
      return res.status(400).json({ error: "Invalid itemIds format" });
    }

    const deletedItems = [];

    for (const itemId of itemIds) {
      const item = await ItemModel.findByIdAndDelete(itemId);

      if (!item) {
        continue;
      }

      deletedItems.push(item);
    }

    res.json({ message: "Items deleted successfully", deletedItems });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// insertMany, copyOne, copyMany
