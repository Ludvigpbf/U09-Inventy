import express from "express";
import {
  createItem,
  getAllItems,
  //getItemByItemname, use if getting Item with Itemname instead of ID
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/itemController";

const itemRouter = express.Router();

itemRouter.post("/item", createItem);
itemRouter.get("/items", getAllItems);
itemRouter.get("/item/:id", getItemById);
// Get item by itemname:
// itemRouter.get("/item/:itemTitle", getItemByItemTitle);
itemRouter.put("/item/:id", updateItemById);
itemRouter.delete("/item/:id", deleteItemById);

export default itemRouter;
