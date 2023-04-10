import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { ErrorMessages } from "../utils/enums";
import { ErrorResponse } from "../utils/error-response";
import { CustomRequest } from "../utils/interfaces";
import { asyncHandler } from "./async.handler";

export const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "") as string;

    if (!Boolean(token)) {
      return next(new ErrorResponse(ErrorMessages.TokentIsNotActive, 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);

    (req as CustomRequest).token = decoded;

    next();
  }
);
