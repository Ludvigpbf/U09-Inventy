import express from "express";
import {
  createItem,
  createMultipleItems,
  getAllItems,
  getItemByItemTitle,
  getItemById,
  updateItemById,
  updateMultipleItems,
  deleteItemById,
  deleteMultipleItems,
} from "../controllers/itemController";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import ItemModel from "../models/Item";

const itemRouter = express.Router();

itemRouter.post("/item", /* isAuthenticated, */ createItem);
itemRouter.post("/items", /*  isAuthenticated,  */ createMultipleItems);
itemRouter.get(
  "/items",
  /* isAuthenticated,
  isAuthorizedAllResources(ItemModel), */
  getAllItems
);
itemRouter.get(
  "/item/:id",
  /*  isAuthenticated,
  isAuthorizedById(ItemModel), */
  getItemById
);

itemRouter.get(
  "/item/title/:itemTitle",
  /* isAuthenticated,
  isAuthorizedByTitle(ItemModel, "itemTitle"), */
  getItemByItemTitle
);

itemRouter.put(
  "/items",
  /*   isAuthenticated,
  isAuthorizedAllResources(ItemModel), */
  updateMultipleItems
);
itemRouter.put(
  "/item/:id",
  /*  isAuthenticated,
  isAuthorizedById(ItemModel), */
  updateItemById
);
itemRouter.delete(
  "/item/:id",
  /*  isAuthenticated,
  isAuthorizedById(ItemModel), */
  deleteItemById
);

itemRouter.delete(
  "/items",
  /*   isAuthenticated,
  isAuthorizedAllResources(ItemModel), */
  deleteMultipleItems
);

export default itemRouter;
