import { model, Schema } from "mongoose";

interface ISavedTasks {
  user: Schema.Types.ObjectId;
  products: [{ product: Schema.Types.ObjectId }];
  categories:[{category:Schema.Types.ObjectId ,procedures:[]}]
  procedures:[{task: Schema.Types.ObjectId; quantity:number}]
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
          components:[]
        }
      
      },
    ],
    categories:[
      {
        category:{
          type: Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        procedures:[]
      }
    ],
    procedures: [
   {
    task:{
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    }
   }
    ],
  },
  {
    timestamps: true,
  }
);

const SavedTasks = model<ISavedTasks>("SavedTasks", savedTasksSchema);

export default SavedTasks;