import jwt from "jsonwebtoken";

export const jwtGenerate = (id: string, firstName: string): string => {
  const token = jwt.sign({ _id: id, name: firstName }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};
