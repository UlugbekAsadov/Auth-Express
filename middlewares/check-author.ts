import { Request, Response, NextFunction } from "express";
import { Post } from "../models";
import { ErrorResponse } from "../utils/error-response";
import { ErrorMessages } from "../utils/enums";
import { asyncHandler } from "./async.handler";

export const checkAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUserId = res.locals.user._id;
    const postId = req.params.id;
    console.log(authenticatedUserId)
    const post = await Post.findById(postId);
    console.log(postId)

    if (authenticatedUserId !== post?.author._id.toString()) {
      return next(new ErrorResponse(ErrorMessages.NotAuthor, 403));
    }

    next();
  }
);
