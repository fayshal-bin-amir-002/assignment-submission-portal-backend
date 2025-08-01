import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.post("/", validateRequest(userValidation), UserController.registerUser);

export const UserRoutes = router;
