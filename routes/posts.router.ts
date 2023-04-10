import { Router } from "express";
import { validateToken } from "../middlewares/validateToken";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePostById,
} from "../controllers/post.controller";
import { checkAuthor } from "../middlewares/check-author";
const postsRouter = Router();

postsRouter.post("/", validateToken, createPost);
postsRouter.get("/", getPosts);
postsRouter.get("/:id", validateToken, getPostById);
postsRouter.delete("/:id", validateToken, checkAuthor, deletePost);
postsRouter.put("/:id", validateToken, checkAuthor, updatePostById);

export { postsRouter };
