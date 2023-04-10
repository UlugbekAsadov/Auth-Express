import { asyncHandler } from "../middlewares/async.handler";
import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/error-response";
import { ErrorMessages, SuccessMessages } from "../utils/enums";
import { IUser } from "../utils/interfaces";

// @method    GET
// @route     /api/v1/users/all
// @desc      returns all users from db
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: IUser[] = await User.find();

    res.status(200).json({ success: true, data: users });
  }
);

// @method    GET
// @route     /api/v1/users/:userId
// @desc      returns single user from db
export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`${ErrorMessages.UserNotFound}`, 404));
    }

    res.status(200).json({ success: true, data: user });
  }
);

// @method    PUT
// @route     /api/v1/users/:userId
// @desc      updates user from db
export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { age, email, firstName, lastName, password, phoneNumber, isActive } =
      req.body;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`${ErrorMessages.UserNotFound}`, 404));
    }

    const updatingUserData = {
      age: age || user.age,
      email: email || user.email,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      password: password || user.password,
      phoneNumber: phoneNumber || user.phoneNumber,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatingUserData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: SuccessMessages.Updated,
    });
  }
);

// @method    DELETE
// @route     /api/v1/users/:userId
// @desc      Make inactive user from db
export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorResponse(`${ErrorMessages.UserNotFound}`, 404));
    }

    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: SuccessMessages.Deleted });
  }
);
