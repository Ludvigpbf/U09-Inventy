import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  //getSupplierBySupplierName, use if getting Supplier with SupplierName instead of ID
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from "../controllers/supplierController";

const supplierRouter = express.Router();

supplierRouter.post("/supplier", createSupplier);
supplierRouter.get("/suppliers", getAllSuppliers);
supplierRouter.get("/supplier/:id", getSupplierById);
// Get supplier by supplierName:
// supplierRouter.get("/supplier/:supplierName", getSupplierBySupplierName);
supplierRouter.put("/supplier/:id", updateSupplierById);
supplierRouter.delete("/supplier/:id", deleteSupplierById);

export default supplierRouter;
