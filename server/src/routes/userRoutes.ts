import express from "express";
import {
  createUser,
  getUserById,
  getUserByUsername,
} from "../controllers/userController";
import {
  isAuthenticated,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import UserModel from "../models/User";

const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get(
  "/user/:id",
  /*   isAuthenticated,
  isAuthorizedById(UserModel), */
  getUserById
);
userRouter.get(
  "/user/company/:username",
  isAuthenticated,
  isAuthorizedByTitle(UserModel, "companyName"),
  getUserByUsername
);

export default userRouter;
