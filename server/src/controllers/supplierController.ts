import { Request, Response } from "express";
import SupplierModel from "../models/Supplier";

// Create a new Supplier
export const createSupplier = async (req: Request, res: Response) => {
  try {
    const newSupplier = await SupplierModel.create(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Read all supplier
export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const supplier = await SupplierModel.find();
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single supplier by ID
export const getSupplierById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const supplier = await SupplierModel.findById(id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Read a single supplier by supplierName
export const getSupplierBySupplierName = async (
  req: Request,
  res: Response
) => {
  const { supplierName } = req.params;

  try {
    const supplier = await SupplierModel.findOne({ supplierName });
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a supplier by ID
export const updateSupplierById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { supplierName } = req.body;
  try {
    const supplier = await SupplierModel.findByIdAndUpdate(
      id,
      {
        supplierName,
      },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a supplier by ID
export const deleteSupplierById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const supplier = await SupplierModel.findByIdAndDelete(id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
