import { Schema, model } from "mongoose";
import { ISubmission, SubmissionStatus } from "./submission.interface";

const submissionSchema = new Schema<ISubmission>(
  {
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submissionUrl: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: Object.values(SubmissionStatus),
      default: SubmissionStatus.PENDING,
    },
    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = model<ISubmission>("Submission", submissionSchema);

export default Submission;
