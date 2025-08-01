import AppError from "../../errors/appError";
import { IUser, UserRole } from "./user.interface";
import httpStatus from "http-status";
import User from "./user.model";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import config from "../../config";
import QueryBuilder from "../../builder/QueryBuilder";

const registerUser = async (payload: IUser) => {
  if ([UserRole.INSTRUCTOR].includes(payload?.role)) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Invalid user info!");
  }

  const user = await User.isUserExists(payload?.email);

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already registered");
  }

  const result = await User.create(payload);
  const { email, role } = result;

  const jwtPayload: IJwtPayload = {
    email,
    role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const UserService = {
  registerUser,
};
