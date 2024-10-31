import { model, Schema } from "mongoose";

interface ISavedTasks {
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId; quantity: Number }];
  totalAmount: Number;
}

const savedTasksSchema = new Schema<ISavedTasks>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SavedTasks = model<ISavedTasks>("SavedTasks", savedTasksSchema);

export default SavedTasks;