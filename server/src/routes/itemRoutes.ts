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
  getItemsForUser,
} from "../controllers/itemController";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import ItemModel from "../models/Item";

const itemRouter = express.Router();

itemRouter.post("/newItem", /* isAuthenticated, */ createItem);
itemRouter.post("/newItems", /*  isAuthenticated,  */ createMultipleItems);
itemRouter.get(
  "/itemsen",
  /* isAuthenticated,
  isAuthorizedAllResources(ItemModel), */
  getAllItems
);

itemRouter.get(
  "/items",
  /* isAuthenticated,
  isAuthorizedAllResources(ItemModel), */
  getItemsForUser
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
