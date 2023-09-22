import express from "express";
import {
  createList,
  getAllLists,
  //getListByListTitle, use if getting List with ListTitle instead of ID
  getListById,
  updateListById,
  deleteListById,
} from "../controllers/listController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const listRouter = express.Router();

listRouter.post("/list", isAuthenticated, createList);
listRouter.get("/lists", isAuthenticated, getAllLists);
listRouter.get("/list/:id", isAuthenticated, getListById);
// Get list by listname:
// listRouter.get("/list/:listTitle",isAuthenticated, getListByListTitle);
listRouter.put("/list/:id", isAuthenticated, updateListById);
listRouter.delete("/list/:id", isAuthenticated, deleteListById);

export default listRouter;
