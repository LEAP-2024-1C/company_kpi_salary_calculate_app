import { model, Schema } from "mongoose";
import { ITask } from "./components.model";

interface ISavedTasks {
  user: Schema.Types.ObjectId;
  products: ISavedProduct[];
}
interface ISavedProduct {
  product_id: Schema.Types.ObjectId;
  productName: String;
  components: ISavedComponents[];
}
interface ISavedComponents {
  _id: Schema.Types.ObjectId;
  componentName: string;
  procedures: ITask[];
}

const savedTasksSchema = new Schema<ISavedTasks>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        components: [
          {
            _id: {
              type: Schema.Types.ObjectId,
              required: true,
            },
            categoryName: {
              type: String,
              required: true,
            },
            procedures: [
              {
                taskName: {
                  type: String,
                  required: [true],
                },
                quantity: {
                  type: Number,
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
                  type: Number,
                  required: [true],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SavedTasks = model<ISavedTasks>("SavedTasks", savedTasksSchema);

export default SavedTasks;
