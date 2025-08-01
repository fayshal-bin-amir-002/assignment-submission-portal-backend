import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserService.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `User registration completed successfully!`,
    data: result,
  });
});

export const UserController = {
  registerUser,
};
