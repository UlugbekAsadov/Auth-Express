import { Response, Request, NextFunction } from "express";
import { Post, User } from "../models";
import { asyncHandler } from "../middlewares/async.handler";
import { CustomRequest } from "../utils/interfaces";
import { ErrorResponse } from "../utils/error-response";
import { ErrorMessages, SuccessMessages } from "../utils/enums";

// @method    POST
// @route     /api/v1/posts
// @desc      Creates Post
// @roles     Authorized
export const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;

    const userId = res.locals.user._id;

    const author = await User.findById(userId);

    const newPost = await Post.create({
      title,
      author,
    });

    res.status(200).json({ success: true, data: newPost });
  }
);

// @method    GET
// @route     /api/v1/posts
// @desc      Get all posts
// @roles     ALL
export const getPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find();

    res.status(200).json({
      success: true,
      data: posts,
    });
  }
);

// @method    GET
// @route     /api/v1/posts/:id
// @desc      Get post by id
// @roles     ALL
export const getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new ErrorResponse(ErrorMessages.PostNotFound, 404));
    }

    res.status(200).json({ success: true, data: post });
  }
);

// @method    PUT
// @route     /api/v1/posts/:id
// @desc      Update post by id
// @roles     Authorized || AUTHOR of post
export const updatePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { image, title } = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    const updatingPost = {
      title: title || post?.title,
    };

    const updatedPost = await Post.findByIdAndUpdate(postId, updatingPost, {
      new: true,
    });

    res.status(201).json({ success: true, data: updatedPost });
  }
);

// @method    DELETE
// @route     /api/v1/posts/:id
// @desc      Delete Post
// @roles     Authorized || AUTHOR of post
export const deletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    await Post.findByIdAndRemove(postId);

    res.status(201).json({ success: true, message: SuccessMessages.Deleted });
  }
);
