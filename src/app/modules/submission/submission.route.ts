import { Router } from "express";
import { SubmissionController } from "./submission.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createSubmissionValidation,
  updateStatusValidation,
} from "./submission.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/",
  auth(UserRole.STUDENT),
  validateRequest(createSubmissionValidation),
  SubmissionController.createSubmission
);

router.get(
  "/:studentId",
  auth(UserRole.STUDENT),
  SubmissionController.getMySubmissions
);

router.get(
  "/assignment/:assignmentId",
  auth(UserRole.INSTRUCTOR),
  SubmissionController.getAllSubmissionsByAssignment
);

router.patch(
  "/:submissionId/status",
  auth(UserRole.INSTRUCTOR),
  validateRequest(updateStatusValidation),
  SubmissionController.updateSubmissionStatus
);

router.get(
  "/stats/status",
  auth(UserRole.INSTRUCTOR),
  SubmissionController.getSubmissionStatsByStatus
);

export const SubmissionRoutes = router;
