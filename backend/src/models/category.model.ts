import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface ITask {
  _id: Schema.Types.ObjectId;
  taskName: string;
  quantity: number;
  status: string;
  unitPrice: number;
}
interface ICategory {
  _id: Schema.Types.ObjectId;
  categoryName: String;
  procedures: ITask[];
  created_at: Date;
  updated_at: Date;
}
const categorySchema = new Schema<ICategory>({
  categoryName: {
    type: String,
    unique: true,
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
        type: String,
        enum: ["pending", "progress", "done", "review"],
        default: "pending",
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

const Category = model("Category", categorySchema);
export default Category;
