import { Types } from "mongoose";
import User from "../user/user.model";
import { IAuth } from "./auth.interface";
import { createToken, IJwtPayload } from "../../utils/token.utils";
import config from "../../config";

const loginUser = async (payload: IAuth) => {
  const user = await User.isUserExists(payload?.email);
  const { email, role, password, _id } = user;

  await User.isPasswordMatched(payload?.password, password);

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

export const AuthService = {
  loginUser,
};
