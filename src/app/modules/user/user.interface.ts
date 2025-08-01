import { Document, Model, Types } from "mongoose";

export enum UserRole {
  INSTRUCTOR = "instructor",
  STUDENT = "student",
}

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
