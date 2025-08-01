import { z } from "zod";
import { SubmissionStatus } from "./submission.interface";

export const createSubmissionValidation = z.object({
  body: z.object({
    assignment: z.string().trim().min(1, "Assignment ID is required"),
    student: z.string().trim().min(1, "Student ID is required"),
    submissionUrl: z.string().trim().min(1, "Submission URL is required"),
    note: z.string().trim().min(1, "Note must not be empty").optional(),
  }),
});

export const updateStatusValidation = z.object({
  body: z.object({
    status: z.nativeEnum(SubmissionStatus),
    feedback: z.string().optional(),
  }),
});
