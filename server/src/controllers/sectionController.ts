import { Request, Response } from "express";
import SectionModel from "../models/Section";

// Create a new Section
export const createSection = async (req: Request, res: Response) => {
  try {
    const newSection = await SectionModel.create(req.body);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all section
export const getAllSections = async (req: Request, res: Response) => {
  try {
    const section = await SectionModel.find();
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single section by ID
export const getSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const section = await SectionModel.findById(id);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single section by sectionTitle
export const getSectionBySectionTitle = async (req: Request, res: Response) => {
  const { sectionTitle } = req.params;

  try {
    const section = await SectionModel.findOne({ sectionTitle });
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a section by ID
export const updateSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sectionTitle, sectionDescription, sectionImage, sectionItem } =
    req.body;
  try {
    const section = await SectionModel.findByIdAndUpdate(
      id,
      {
        sectionTitle,
        sectionDescription,
        sectionImage,
        sectionItem,
      },
      { new: true }
    );

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a section by ID
export const deleteSectionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const section = await SectionModel.findByIdAndDelete(id);

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
