import mongoose from "mongoose";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

let mongoURI: string;

// Set to "production" if in production environment else "development"
if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.MONGODB_URI || "";
} else {
  mongoURI = "mongodb://127.0.0.1:27017/inventy";
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default mongoose;
