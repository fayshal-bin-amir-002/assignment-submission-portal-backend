import { Document, Model, Types } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  description: string;
  deadline: Date | string;
}

export interface AssignmentModel extends Model<IAssignment> {
  isAssignementExistsByName(name: string): Promise<IAssignment>;
  isAssignementExistsById(id: string | Types.ObjectId): Promise<IAssignment>;
}
