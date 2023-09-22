import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let mongoURI: string;

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
