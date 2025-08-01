import { Schema, model } from "mongoose";
import { IUser, UserModel, UserRole } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const userSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: Object.values(UserRole),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    return {
      _id: ret._id,
      email: ret.email,
      role: ret.role,
    };
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// checking that user is exists with email or phone
userSchema.statics.isUserExists = async (email: string) => {
  const existingUser = await User.findOne({
    email: email,
  }).select("+password");
  return existingUser;
};

// checking that password is matched  or not
userSchema.statics.isPasswordMatched = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  const isPasswordMatched = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong password");
  }
  return isPasswordMatched;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
