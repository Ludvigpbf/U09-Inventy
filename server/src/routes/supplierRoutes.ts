import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createSupplier,
  getAllSuppliers,
  //getSupplierBySupplierName, use if getting Supplier with SupplierName instead of ID
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from "../controllers/supplierController";

const supplierRouter = express.Router();

supplierRouter.post("/supplier", isAuthenticated, createSupplier);
supplierRouter.get("/suppliers", isAuthenticated, getAllSuppliers);
supplierRouter.get("/supplier/:id", isAuthenticated, getSupplierById);
// Get supplier by supplierName:
// supplierRouter.get("/supplier/:supplierName",isAuthenticated, getSupplierBySupplierName);
supplierRouter.put("/supplier/:id", isAuthenticated, updateSupplierById);
supplierRouter.delete("/supplier/:id", isAuthenticated, deleteSupplierById);

export default supplierRouter;
