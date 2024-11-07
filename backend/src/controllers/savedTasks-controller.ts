import { Request, Response } from "express";
import SavedTasks from "../models/savedTasks.model";

export const createSavedTasks = async (req: Request, res: Response) => {
  const { user_id, product } = req.body;
  try {
    console.log("user_id", user_id);
    console.log("product", product);
    const { product_id } = product;
    const findSavedTasks = await SavedTasks.findOne({ user: user_id });

    if (!findSavedTasks) {
      const savedTasks = await SavedTasks.create({
        user: user_id,
        products: product,
      });
      console.log(savedTasks);
      return res.status(200).json({
        message: "created new savedTasks",
        savedTasks,
      });
    }

    const findDuplicated = findSavedTasks.products.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (findDuplicated > -1) {
      res.status(404).json({ message: "хадгалсан бараа байна" });
      return;
    } else {
      findSavedTasks.products.push(product);
    }

    const updatedSavedTasks = await findSavedTasks.save();
    res.status(200).json({
      message: "updated cart",
      updatedSavedTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to create carts",
    });
  }
};

export const getUserSavedTasks = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const cart = await SavedTasks.findOne({ user: id }).populate(
      "products.components"
    );
    console.log(id);
    res.status(200).json({
      message: "Employee saved tasks is read successfully",
      cart: cart,
      
    });
    console.log("cart",cart)
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "failed to get saved tasks data",
    });
  }
};

// export const updateSavedTasks = async (req: Request, res: Response) => {
//   const { id } = req.user;
//   const { taskId, newQuantity } = req.body;
//   try {
//     const savedTasks = await SavedTasks.findOne({ user: id });
//     if (!savedTasks) {
//       return res.status(400).json({
//         message: "not found user",
//       });
//     }

//     const findTask = savedTasks.procedures.findIndex(
//       (item) => item.task.toString() === taskId
//     );

//     savedTasks.procedures[findTask].quantity = newQuantity;

//     const updatedSavedTasks = await savedTasks.save();
//     res.status(200).json({
//       message: "updated saved tasks",
//       updatedSavedTasks,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: "failed to get saved tasks",
//     });
//   }
// };
