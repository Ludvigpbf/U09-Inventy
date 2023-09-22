import express from "express";
import {
  createItem,
  getAllItems,
  //getItemByItemname, use if getting Item with Itemname instead of ID
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/itemController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const itemRouter = express.Router();

itemRouter.post("/item", isAuthenticated, createItem);
itemRouter.get("/items", isAuthenticated, getAllItems);
itemRouter.get("/item/:id", isAuthenticated, getItemById);
// Get item by itemname:
// itemRouter.get("/item/:itemTitle",isAuthenticated, getItemByItemTitle);
itemRouter.put("/item/:id", isAuthenticated, updateItemById);
itemRouter.delete("/item/:id", isAuthenticated, deleteItemById);

export default itemRouter;
