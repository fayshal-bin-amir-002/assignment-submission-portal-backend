import AppError from "../../errors/appError";
import { IAssignment } from "./assignment.interface";
import httpStatus from "http-status";
import { Assignment } from "./assignment.model";
import { Types } from "mongoose";

const createAssignment = async (payload: IAssignment) => {
  const existing = await Assignment.isAssignementExistsByName(payload.title);

  if (existing) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Assignment with this title already exists."
    );
  }

  const result = await Assignment.create(payload);
  return result;
};

const getAllAssignments = async () => {
  const result = await Assignment.find();
  return result;
};

const getAssignmentById = async (id: string | Types.ObjectId) => {
  const assignment = await Assignment.isAssignementExistsById(id);

  if (!assignment) {
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found.");
  }

  return assignment;
};

const updateAssignment = async (
  id: string | Types.ObjectId,
  payload: Partial<IAssignment>
) => {
  const assignment = await Assignment.isAssignementExistsById(id);

  if (!assignment) {
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found.");
  }

  const updated = await Assignment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updated;
};

const deleteAssignment = async (id: string | Types.ObjectId) => {
  const assignment = await Assignment.isAssignementExistsById(id);

  if (!assignment) {
    throw new AppError(httpStatus.NOT_FOUND, "Assignment not found.");
  }

  const deleted = await Assignment.findByIdAndDelete(id);
  return deleted;
};

export const AssignmentService = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
