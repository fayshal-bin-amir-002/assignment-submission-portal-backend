import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { AssignmentRoutes } from "../modules/assignment/assignment.route";
import { SubmissionRoutes } from "../modules/submission/submission.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/assignment",
    route: AssignmentRoutes,
  },
  {
    path: "/submission",
    route: SubmissionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
