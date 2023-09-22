import express from "express";
import {
  createUser,
  getAllUsers,
  //getUserByUsername, use if getting user with username instead of ID
  getUserById,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/user/:id", getUserById);
// Get user by username:
// userRouter.get("/user/:username", getUserByUsername);

export default userRouter;
