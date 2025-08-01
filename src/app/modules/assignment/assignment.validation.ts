import { z } from "zod";

export const assignmentValidation = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title cannot be empty"),

    description: z.string().trim().min(1, "Description cannot be empty"),

    deadline: z
      .union([
        z.string().datetime("Deadline must be a valid ISO datetime string"),
        z.date(),
      ])
      .refine((val) => new Date(val) > new Date(), {
        message: "Deadline must be a future date",
      }),
  }),
});
