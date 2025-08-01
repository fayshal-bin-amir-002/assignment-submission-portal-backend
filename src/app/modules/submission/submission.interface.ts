import { Document, Types } from "mongoose";

export enum SubmissionStatus {
  PENDING = "pending",
  REVIEWED = "reviewed",
  REJECTED = "rejected",
}

export interface ISubmission extends Document {
  assignment: Types.ObjectId;
  student: Types.ObjectId;
  submissionUrl: string;
  note?: string;
  submittedAt: Date;
  status: SubmissionStatus;
  feedback?: string;
}
