import { model, Schema } from "mongoose";

interface IProduct {
  productName: string;
  description: string;
  images?: [string];
  quantity: number;
  status: number;
  category: [Schema.Types.ObjectId];
}

const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "comment",
    },
    images: {
      type: [String],
      default: ["img"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: Number,
      default: 0,
    },
    category: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);
const Product = model<IProduct>("Product", productSchema);
export default Product;
