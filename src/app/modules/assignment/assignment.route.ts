import { Router } from "express";
import { AssignmentController } from "./assignment.controller";
import validateRequest from "../../middleware/validateRequest";
import { assignmentValidation } from "./assignment.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/",
  auth(UserRole.INSTRUCTOR),
  validateRequest(assignmentValidation),
  AssignmentController.createAssignment
);

router.get("/", AssignmentController.getAllAssignments);

router.get("/:id", AssignmentController.getAssignmentById);

router.patch(
  "/:id",
  auth(UserRole.INSTRUCTOR),
  validateRequest(assignmentValidation),
  AssignmentController.updateAssignment
);

router.delete(
  "/:id",
  auth(UserRole.INSTRUCTOR),
  AssignmentController.deleteAssignment
);

export const AssignmentRoutes = router;
