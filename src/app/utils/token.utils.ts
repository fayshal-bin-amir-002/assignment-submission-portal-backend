import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../modules/user/user.interface";

export interface IJwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: string,
  expiresIn: string | any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
