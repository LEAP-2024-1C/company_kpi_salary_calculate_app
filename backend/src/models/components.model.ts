import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface ITask {
  _id: Schema.Types.ObjectId;
  taskName: string;
  quantity: number;
  status: IStatus;
  unitPrice: number;
}
export interface IStatus {
  pending: number;
  progress: number;
  done: number;
  review: number;
}
export type ICategory = {
  _id: Schema.Types.ObjectId;
  categoryName: String;
  procedures: ITask[];
  created_at: Date;
  updated_at: Date;
};
const componentSchema = new Schema<ICategory>({
  categoryName: {
    type: String,
    required: [true, "Ажлын нэрийг оруулах"],
  },
  procedures: [
    {
      taskName: {
        type: String,
        required: [true],
      },
      quantity: {
        type: String,
        required: [true],
      },
      status: {
        pending: {
          type: Number,
          default: 0,
        },
        progress: {
          type: Number,
          default: 0,
        },
        done: {
          type: Number,
          default: 0,
        },
        review: {
          type: Number,
          default: 0,
        },
      },
      unitPrice: {
        type: String,
        required: [true],
      },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Components = model("Components", componentSchema);
export default Components;
