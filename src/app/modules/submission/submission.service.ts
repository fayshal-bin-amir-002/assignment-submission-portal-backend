import AppError from "../../errors/appError";
import httpStatus from "http-status";
import Submission from "./submission.model";
import User from "../user/user.model";
import { ISubmission, SubmissionStatus } from "./submission.interface";
import { Assignment } from "../assignment/assignment.model";

const createSubmission = async (payload: ISubmission) => {
  const assignment = await Assignment.findById(payload.assignment);
  if (!assignment) {
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found!");
  }

  const student = await User.findById(payload.student);
  if (!student || student.role !== "student") {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid student information!");
  }

  const alreadySubmitted = await Submission.findOne({
    assignment: payload.assignment,
    student: payload.student,
  });

  if (alreadySubmitted) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already submitted this assignment"
    );
  }

  const submission = await Submission.create(payload);
  return submission;
};

const getMySubmissions = async (studentId: string) => {
  const submissions = await Submission.find({ student: studentId }).populate(
    "assignment"
  );
  return submissions;
};

const getAllSubmissionsByAssignment = async (assignmentId: string) => {
  const submissions = await Submission.find({ assignment: assignmentId })
    .populate("student")
    .populate("assignment");

  return submissions;
};

const updateSubmissionStatus = async (
  submissionId: string,
  status: SubmissionStatus,
  feedback?: string
) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Submission not found");
  }

  submission.status = status;
  if (feedback !== undefined) {
    submission.feedback = feedback;
  }

  await submission.save();
  return submission;
};

const getSubmissionStatsByStatus = async () => {
  const stats = await Submission.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);

  const allStatuses = ["pending", "reviewed", "rejected"];
  const result = allStatuses.map((status) => {
    const found = stats.find((s) => s.status === status);
    return {
      status,
      count: found ? found.count : 0,
    };
  });

  return result;
};

export const SubmissionService = {
  createSubmission,
  getMySubmissions,
  getAllSubmissionsByAssignment,
  updateSubmissionStatus,
  getSubmissionStatsByStatus,
};
