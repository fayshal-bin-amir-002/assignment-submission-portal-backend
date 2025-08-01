import AppError from "../../errors/appError";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import User from "./user.model";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import config from "../../config";

const registerUser = async (payload: IUser) => {
  const user = await User.isUserExists(payload?.email);

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already registered");
  }

  const result = await User.create(payload);
  const { email, role, _id } = result;

  const jwtPayload: IJwtPayload = {
    id: _id as string,
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
