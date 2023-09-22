import express from "express";
import {
  createImage,
  getAllImages,
  //getSectionBySectionName, use if getting Section with SectionName instead of ID
  getImageById,
  updateImageById,
  deleteImageById,
} from "../controllers/imageController";

const imageRouter = express.Router();

imageRouter.post("/image", createImage);
imageRouter.get("/images", getAllImages);
imageRouter.get("/image/:id", getImageById);
// Get image by imageName:
// imageRouter.get("/image/:imageTitle", getImageByImageTitle);
imageRouter.put("/image/:id", updateImageById);
imageRouter.delete("/image/:id", deleteImageById);

export default imageRouter;
