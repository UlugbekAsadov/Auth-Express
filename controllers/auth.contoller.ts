import { Request, Response } from "express";
import { IUser } from "../utils/interfaces";
import { User } from "../models/user.model";
import { ErrorMessages } from "../utils/enums";
import { UserRequiredFields } from "../utils/types";
import { asyncHandler } from "../middlewares/async.handler";

// @method    POST
// @route     /api/v1/user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, age, phoneNumber } = req.body;

  try {
    const user: IUser = {
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
        return res.status(403).json({
          success: false,
          message: `${ErrorMessages.ValidationError} - ${key} is required`,
        });
      }
    }

    await User.create(user);
    res.status(201).json({
      success: true,
      body: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});
