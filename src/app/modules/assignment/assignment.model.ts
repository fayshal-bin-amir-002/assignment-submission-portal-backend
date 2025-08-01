import { Schema, model } from "mongoose";
import { IAssignment, AssignmentModel } from "./assignment.interface";

const assignmentSchema = new Schema<IAssignment, AssignmentModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

assignmentSchema.statics.isAssignementExistsByName = async function (name) {
  return this.findOne({ title: name });
};

assignmentSchema.statics.isAssignementExistsById = async function (id) {
  return this.findById(id);
};

export const Assignment = model<IAssignment, AssignmentModel>(
  "Assignment",
  assignmentSchema
);
