import { z } from "zod";
import { UserRole } from "./user.interface";

export const userValidation = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email({ message: "A valid email is required" })
      .min(1, { message: "Email is required" }),
    password: z.string().trim().min(6, {
      message: "Password is required and must be at least 6 characters long",
    }),
    role: z.nativeEnum(UserRole),
  }),
});
