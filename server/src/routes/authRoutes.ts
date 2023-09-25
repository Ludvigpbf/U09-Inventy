import express from "express";
import {
  isAuthenticated,
  isAuthorizedById,
} from "../middlewares/authMiddleware";
import {
  deleteUser,
  login,
  logout,
  updatePassword,
  updateUser,
} from "../controllers/authController";
import UserModel from "../models/User";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", isAuthenticated, logout);
authRouter.put(
  "/user/:id",
  isAuthenticated,
  isAuthorizedById(UserModel),
  updateUser,
  updatePassword
);
authRouter.delete(
  "/user/:id",
  isAuthenticated,
  isAuthorizedById(UserModel),
  deleteUser
);

export default authRouter;
