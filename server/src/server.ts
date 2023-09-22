import express from "express";
import cors from "cors";
import mongoose from "./db";
import multer from "multer";

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import listRouter from "./routes/listRoutes";
import itemRouter from "./routes/itemRoutes";
import supplierRouter from "./routes/supplierRoutes";
import sectionRouter from "./routes/sectionRoutes";
import imageRouter from "./routes/imageRoutes";
import periodRouter from "./routes/periodRoutes";
import categoryRouter from "./routes/categoryRoutes";
import planRouter from "./routes/planRoutes";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    /*  origin: "http://localhost:5173",
    credentials: true, */
  })
);
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

mongoose;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/item", itemRouter);
app.use("/supplier", supplierRouter);
app.use("/section", sectionRouter);
app.use("/image", imageRouter);
app.use("/period", periodRouter);
app.use("/category", categoryRouter);
app.use("/plan", planRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);
