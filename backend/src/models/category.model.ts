import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface ITask {
  taskName: string;
  quantity: number;
  price: number;
  unit: number;
}
interface ICategory {
  _id: Schema.Types.ObjectId;
  categoryName: String;
  procedures: ITask[];
  design_img?: String;
  created_at: Date;
  updated_at: Date;
}
const categorySchema = new Schema<ICategory>({
  categoryName: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг оруулах"],
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
      price: {
        type: String,
        required: [true],
      },
      unit: {
        type: String,
        required: [true],
      },
    },
  ],
  design_img: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = model("Employee", categorySchema);
export default Category;
