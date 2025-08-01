import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AssignmentService } from "./assignment.service";

const createAssignment = catchAsync(async (req, res) => {
  const result = await AssignmentService.createAssignment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Assignment created successfully!",
    data: result,
  });
});

const getAllAssignments = catchAsync(async (_req, res) => {
  const result = await AssignmentService.getAllAssignments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignments retrieved successfully!",
    data: result,
  });
});

const getAssignmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AssignmentService.getAssignmentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignment retrieved successfully!",
    data: result,
  });
});

const updateAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AssignmentService.updateAssignment(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignment updated successfully!",
    data: result,
  });
});

const deleteAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AssignmentService.deleteAssignment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assignment deleted successfully!",
    data: result,
  });
});

export const AssignmentController = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
