import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  deleteUser,
  login,
  logout,
  updatePassword,
  updateUser,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", isAuthenticated, logout);
authRouter.put("/user/:id", isAuthenticated, updateUser, updatePassword);
authRouter.delete("/user/:id", isAuthenticated, deleteUser);

export default authRouter;
