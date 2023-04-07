import { ErrorResponse } from "../utils/error-response";
import { Request, Response, NextFunction} from 'express'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

