import { Request, Response } from "express";
import ImageModel from "../models/Image";

// Create a new Image
export const createImage = async (req: Request, res: Response) => {
  try {
    const newImage = await ImageModel.create(req.body);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all Image
export const getAllImages = async (req: Request, res: Response) => {
  try {
    const image = await ImageModel.find();
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single image by ID
export const getImageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const image = await ImageModel.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single image by imageTitle
export const getImageByImageTitle = async (req: Request, res: Response) => {
  const { imageTitle } = req.params;

  try {
    const image = await ImageModel.findOne({ imageTitle });
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a image by ID
export const updateImageById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imageTitle, imageDescription, imagePath } = req.body;
  try {
    const image = await ImageModel.findByIdAndUpdate(
      id,
      {
        imageTitle,
        imageDescription,
        imagePath,
      },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a image by ID
export const deleteImageById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const image = await ImageModel.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
