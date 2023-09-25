import express from "express";
import {
  createImage,
  getAllImages,
  getImageById,
  updateImageById,
  deleteImageById,
  getImageByImageTitle,
} from "../controllers/imageController";
import {
  isAuthenticated,
  isAuthorizedAllResources,
  isAuthorizedById,
  isAuthorizedByTitle,
} from "../middlewares/authMiddleware";
import ImageModel from "../models/Image";

const imageRouter = express.Router();

imageRouter.post("/image", isAuthenticated, createImage);
imageRouter.get(
  "/images",
  isAuthenticated,
  isAuthorizedAllResources(ImageModel),
  getAllImages
);
imageRouter.get(
  "/image/:id",
  isAuthenticated,
  isAuthorizedById(ImageModel),
  getImageById
);
imageRouter.get(
  "/image/title/:imageTitle",
  isAuthenticated,
  isAuthorizedByTitle(ImageModel, "imageTitle"),
  getImageByImageTitle
);
imageRouter.put(
  "/image/:id",
  isAuthenticated,
  isAuthorizedById(ImageModel),
  updateImageById
);
imageRouter.delete(
  "/image/:id",
  isAuthenticated,
  isAuthorizedById(ImageModel),
  deleteImageById
);

export default imageRouter;
