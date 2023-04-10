import { NextFunction, Request, Response } from "express";
import { ILoginForm } from "../utils/interfaces";
import { User } from "../models/user.model";
import { ErrorMessages, SuccessMessages } from "../utils/enums";
import { UserRequiredFields } from "../utils/types";
import { asyncHandler } from "../middlewares/async.handler";
import { ErrorResponse } from "../utils/error-response";

import bcrypt from "bcrypt";
import { jwtGenerate } from "../utils/jwt.generate";

// @method    POST
// @route     /api/v1/auth/register
// @desc      register User
export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName, age, phoneNumber } = req.body;

    try {
      const user = {
        email,
        password,
        firstName,
        lastName,
        age,
        phoneNumber,
      };

      const requiredFields: UserRequiredFields = {
        email,
        password,
        firstName,
      };

      // validate
      for (const key in requiredFields) {
        if (!requiredFields[key as keyof UserRequiredFields]) {
          return next(
            new ErrorResponse(
              `${ErrorMessages.ValidationError} - ${key} is required`,
              403
            )
          );
        }
      }

      const aviableUser = await User.create(user);
      const token = jwtGenerate(
        aviableUser._id.toString(),
        aviableUser.firstName
      );

      res.status(201).json({
        success: true,
        body: aviableUser,
        message: SuccessMessages.Created,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  }
);

// @method    POST
// @route     /api/v1/auth/login
// @desc      login User
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const credentials: ILoginForm = {
      email,
      password,
    };

    // validate
    for (const key in credentials) {
      if (!credentials[key as keyof ILoginForm]) {
        return next(
          new ErrorResponse(
            `${ErrorMessages.ValidationError} - ${key} is required`,
            403
          )
        );
      }
    }

    // check user is aviable on db
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse(ErrorMessages.InvalidCredentials, 403));
    }

    // checking password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(new ErrorResponse(ErrorMessages.InvalidCredentials, 403));
    }

    //generating jwt token
    const token = jwtGenerate(user._id.toString(), user.firstName);

    // success
    res.status(200).json({
      success: true,
      data: user,
      token,
    });
  }
);
