import { Request, Response } from "express";
import ListModel from "../models/List"; // Import the List model

// Create a new list
export const createList = async (req: Request, res: Response) => {
  try {
    const newList = await ListModel.create(req.body);
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

/* export const getAllLists = async (req: Request, res: Response) => {
  try {
    const ownedLists = (req as any).ownedResources.filter((resource: any) => {
      console.log("testing 1");
      console.log(ownedLists);
      return resource instanceof ListModel;
    });
    console.log("testing 2");
    res.json(ownedLists);
    console.log(ownedLists);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}; */

export const getListsForUser = async (req: Request, res: Response) => {
  try {
    // Extract the user's ID from the request query parameters
    const userId = req.query.ownedBy;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required in the query parameters" });
    }

    // Find lists that are owned by the specified user
    const lists = await ListModel.find({ ownedBy: userId }); // Adjust the query based on your schema

    // Logging the retrieved lists
    console.log("Retrieved lists for user:", lists);

    res.json(lists);
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
    const decodedListTitle = decodeURIComponent(listTitle);

    const list = await ListModel.findOne({ listTitle: decodedListTitle });

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
