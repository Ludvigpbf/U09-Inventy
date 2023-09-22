import express from "express";
import {
  createList,
  getAllLists,
  //getListByListTitle, use if getting List with ListTitle instead of ID
  getListById,
  updateListById,
  deleteListById,
} from "../controllers/listController";

const listRouter = express.Router();

listRouter.post("/list", createList);
listRouter.get("/lists", getAllLists);
listRouter.get("/list/:id", getListById);
// Get list by listname:
// listRouter.get("/list/:listTitle", getListByListTitle);
listRouter.put("/list/:id", updateListById);
listRouter.delete("/list/:id", deleteListById);

export default listRouter;
