import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import authRouter from "../routes/auth.router";
import { errorHandler } from "../middlewares/error-handler";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth
app.use("/api/v1/auth", authRouter);

// Error Handler
app.use(errorHandler);

// utils
connectDB();
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
