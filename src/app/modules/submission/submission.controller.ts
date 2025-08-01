import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SubmissionService } from "./submission.service";

const createSubmission = catchAsync(async (req, res) => {
  const result = await SubmissionService.createSubmission(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Assignment submitted successfully!",
    data: result,
  });
});

const getMySubmissions = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await SubmissionService.getMySubmissions(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetched submitted assignments successfully!",
    data: result,
  });
});

const getAllSubmissionsByAssignment = catchAsync(async (req, res) => {
  const { assignmentId } = req.params;
  const result =
    await SubmissionService.getAllSubmissionsByAssignment(assignmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetched all submissions for assignment successfully!",
    data: result,
  });
});

const updateSubmissionStatus = catchAsync(async (req, res) => {
  const { submissionId } = req.params;
  const { status, feedback } = req.body;

  const result = await SubmissionService.updateSubmissionStatus(
    submissionId,
    status,
    feedback
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submission status updated successfully!",
    data: result,
  });
});

const getSubmissionStatsByStatus = catchAsync(async (req, res) => {
  const result = await SubmissionService.getSubmissionStatsByStatus();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Submission stats by status retrieved successfully!",
    data: result,
  });
});

export const SubmissionController = {
  createSubmission,
  getMySubmissions,
  getAllSubmissionsByAssignment,
  updateSubmissionStatus,
  getSubmissionStatsByStatus,
};
