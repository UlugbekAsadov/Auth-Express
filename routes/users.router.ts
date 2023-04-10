import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controller";
import { validateToken } from "../middlewares/validateToken";
const usersRouter = Router();

usersRouter.get("/all", validateToken, getAllUsers);
usersRouter.get("/:userId", validateToken, getUserById);
usersRouter.put("/:userId", validateToken, updateUser);
usersRouter.delete("/:userId", validateToken, deleteUser);

export { usersRouter };
