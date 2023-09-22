import { Request, Response } from "express";
import PeriodModel from "../models/Period";

// Create a new Period
export const createPeriod = async (req: Request, res: Response) => {
  try {
    const newPeriod = await PeriodModel.create(req.body);
    res.status(201).json(newPeriod);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all period
export const getAllPeriods = async (req: Request, res: Response) => {
  try {
    const period = await PeriodModel.find();
    res.json(period);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single period by ID
export const getPeriodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const period = await PeriodModel.findById(id);
    if (!period) {
      return res.status(404).json({ error: "Period not found" });
    }
    res.json(period);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single period by periodTitle
export const getPeriodByPeriodTitle = async (req: Request, res: Response) => {
  const { periodTitle } = req.params;

  try {
    const period = await PeriodModel.findOne({ periodTitle });
    if (!period) {
      return res.status(404).json({ error: "Period not found" });
    }
    res.json(period);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a period by ID
export const updatePeriodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    periodTitle,
    periodeDate,
    periodeDescription,
    periodTotalItems,
    periodeTotalAmount,
  } = req.body;
  try {
    const periodToUpdate = {
      periodTitle,
      periodeDate: {
        startDate: periodeDate.startDate,
        endDate: periodeDate.endDate,
      },
      periodeDescription,
      periodTotalItems,
      periodeTotalAmount,
    };

    const period = await PeriodModel.findByIdAndUpdate(id, periodToUpdate, {
      new: true,
    });

    if (!period) {
      return res.status(404).json({ error: "Period not found" });
    }

    res.json(period);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a period by ID
export const deletePeriodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const period = await PeriodModel.findByIdAndDelete(id);

    if (!period) {
      return res.status(404).json({ error: "Period not found" });
    }

    res.json({
      message: `${period.periodTitle} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete multiple periods by IDs
export const deletePeriodsByIds = async (req: Request, res: Response) => {
  const { ids } = req.body; // Assuming that you send an array of period IDs in the request body

  try {
    const deletedPeriods = await PeriodModel.deleteMany({ _id: { $in: ids } });

    if (deletedPeriods.deletedCount === 0) {
      return res.status(404).json({ error: "No periods found for deletion" });
    }

    res.json({
      message: `${deletedPeriods.deletedCount} periods deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
