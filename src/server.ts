import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db";
import { errorHandler } from "../middlewares/error-handler";
import { authRouter, usersRouter, postsRouter } from "../routes";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth
app.use("/api/v1/auth", authRouter);

// Users
app.use("/api/v1/users", usersRouter);

// Posts
app.use("/api/v1/posts", postsRouter);

// Error Handler
app.use(errorHandler);

// utils
connectDB();
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
