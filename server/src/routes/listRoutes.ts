import express from "express";
import {
  createList,
  getAllLists,
  getListById,
  updateListById,
  deleteListById,
  getListByListTitle,
} from "../controllers/listController";
import {
  isAuthenticated,
  isAuthorizedById,
  isAuthorizedByTitle,
  isAuthorizedAllResources,
} from "../middlewares/authMiddleware";
import ListModel from "../models/List";

const listRouter = express.Router();

listRouter.post("/list", /* isAuthenticated, */ createList);
listRouter.get(
  "/lists",
  /* isAuthenticated, */
  /*  isAuthorizedAllResources(ListModel), */
  getAllLists
);
listRouter.get(
  "/list/:id",
  isAuthenticated,
  isAuthorizedById(ListModel),
  getListById
);

listRouter.get(
  "/list/title/:listTitle",
  isAuthenticated,
  isAuthorizedByTitle(ListModel, "listTitle"),
  getListByListTitle
);
listRouter.put(
  "/list/:id",
  isAuthenticated,
  isAuthorizedById(ListModel),
  updateListById
);
listRouter.delete(
  "/list/:id",
  isAuthenticated,
  isAuthorizedById(ListModel),
  deleteListById
);

export default listRouter;
