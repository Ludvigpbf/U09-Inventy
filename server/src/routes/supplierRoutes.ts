import express from "express";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierBySupplierName,
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from "../controllers/supplierController";
import SupplierModel from "../models/Supplier";

const supplierRouter = express.Router();

supplierRouter.post("/supplier", isAuthenticated, createSupplier);
supplierRouter.get(
  "/suppliers",
  isAuthenticated,
  isAuthorizedAllResources(SupplierModel),
  getAllSuppliers
);
supplierRouter.get(
  "/supplier/:id",
  isAuthenticated,
  isAuthorizedById(SupplierModel),
  getSupplierById
);
supplierRouter.get(
  "/supplier/name/:supplierName",
  isAuthenticated,
  isAuthorizedByTitle(SupplierModel, "supplierName"),
  getSupplierBySupplierName
);
supplierRouter.put(
  "/supplier/:id",
  isAuthenticated,
  isAuthorizedById(SupplierModel),
  updateSupplierById
);
supplierRouter.delete(
  "/supplier/:id",
  isAuthenticated,
  isAuthorizedById(SupplierModel),
  deleteSupplierById
);

export default supplierRouter;
