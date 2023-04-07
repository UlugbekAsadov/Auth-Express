import { IUser } from "../interfaces";

export type UserRequiredFields = Pick<
  IUser,
  "email" | "password" | "firstName"
>;
