import express from "express";
import { login, logout } from "../controllers/authController";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
