import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.contoller";
const authRouter = Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser)

export default authRouter
