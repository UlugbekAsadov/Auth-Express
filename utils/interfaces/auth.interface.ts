import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  password: string;
  isActive: boolean;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
