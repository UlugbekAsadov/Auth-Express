import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controller";
const usersRouter = Router();

usersRouter.get("/all", getAllUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.put("/:userId", updateUser);
usersRouter.delete("/:userId", deleteUser);

export { usersRouter };
