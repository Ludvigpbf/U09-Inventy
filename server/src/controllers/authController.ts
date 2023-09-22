import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

const generateSecretKey = () => {
  const keyLengthInBytes = 32;
  return crypto.randomBytes(keyLengthInBytes).toString("hex");
};

export const secretKey = generateSecretKey();

//Login
export const login = async (req: Request, res: Response) => {
  const { company, password } = req.body;

  try {
    const user = await User.findOne({ company });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid company or password" });
    }

    const companyId = user._id;
    const companyName = user.company;
    const companyEmail = user.email;

    const payload = {
      companyId,
      companyName,
      companyEmail,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "30m" });

    res.header("Authorization", `Bearer ${token}`);
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout
export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};

// Update userdata
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { companyId } = (req as any).user;

    const user = await User.findById(companyId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, billing, departments }: IUser = req.body;

    if (email) user.email = email;
    if (billing) user.billing = billing;
    if (departments) user.departments = departments;

    await user.save({ validateBeforeSave: false });

    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Password
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { companyId } = (req as any).user;
    const { currentPassword, newPassword } = req.body;

    console.log("currentPassword:", currentPassword);
    console.log("newPassword:", newPassword);

    const user = await User.findById(companyId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { companyId } = (req as any).user;

    const user = await User.findById(companyId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: user._id });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
