import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import User from "../models/User";

const generateSecretKey = () => {
  const keyLengthInBytes = 32;
  return crypto.randomBytes(keyLengthInBytes).toString("hex");
};

const secretKey = generateSecretKey();

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

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logout successful" });
};
