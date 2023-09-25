// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../controllers/authController";
import { Model } from "mongoose";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const payload = jwt.verify(token, secretKey) as {
      companyId: string;
      companyName: string;
      companyEmail: string;
    };

    (req as any).user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const isAuthorizedById = (resourceModel: Model<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = (req as any).user;
    const resourceId: string = req.params.id;

    try {
      const resource = await resourceModel.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      if (resource.ownedBy.equals(companyId)) {
        next();
      } else {
        res.status(403).json({
          message: "Access denied. You are not the owner of this resource.",
        });
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export const isAuthorizedByTitle = (
  resourceModel: Model<any>,
  titleField: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = (req as any).user;
    const titleValue: string = req.params[titleField];

    try {
      const query: Record<string, any> = { [titleField]: titleValue };
      const resource = await resourceModel.findOne(query);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      if (resource.ownedBy.equals(companyId)) {
        next();
      } else {
        res.status(403).json({
          message: "Access denied. You are not the owner of this resource.",
        });
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export const isAuthorizedAllResources = (resourceModel: Model<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = (req as any).user;

    try {
      const ownedResources = await resourceModel.find({ ownedBy: companyId });
      (req as any).ownedResources = ownedResources;

      next();
    } catch (error) {
      console.error("Error checking authorization:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
