import jwt from "jsonwebtoken";

export const signToken = (data, expiresIn) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
};
