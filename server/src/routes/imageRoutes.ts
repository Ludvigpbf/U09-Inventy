import express from "express";
import {
  createImage,
  getAllImages,
  //getSectionBySectionName, use if getting Section with SectionName instead of ID
  getImageById,
  updateImageById,
  deleteImageById,
} from "../controllers/imageController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const imageRouter = express.Router();

imageRouter.post("/image", isAuthenticated, createImage);
imageRouter.get("/images", isAuthenticated, getAllImages);
imageRouter.get("/image/:id", isAuthenticated, getImageById);
// Get image by imageName:
// imageRouter.get("/image/:imageTitle", isAuthenticated, getImageByImageTitle);
imageRouter.put("/image/:id", isAuthenticated, updateImageById);
imageRouter.delete("/image/:id", isAuthenticated, deleteImageById);

export default imageRouter;
