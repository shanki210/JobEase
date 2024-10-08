import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import generativeAiRouter from "./routes/generativeAiRoutes.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: 'http://localhost:5173',
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true ,limit: "50mb"}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/gemini", generativeAiRouter);

dbConnection();

app.use(errorMiddleware);
export default app;