import { Request, Response } from "express";
import SavedTasks from "../models/savedTasks.model";

export const createSavedTasks = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { saveProduct } = req.body;
  try {
    console.log("user_id", id);
    console.log("product", saveProduct);

    const { product_id } = saveProduct;
    const findSavedTasks = await SavedTasks.findOne({ user: id });
    console.log("findSavedTasks", findSavedTasks);
    if (!findSavedTasks) {
      const savedTasks = await SavedTasks.create({
        user: id,
        products: saveProduct,
      });
      console.log(savedTasks);
      return res.status(200).json({
        message: "created new savedTasks",
        savedTasks,
      });
    }

    const findIndex = findSavedTasks.products.findIndex(
      (item) => item.product_id.toString() === product_id
    );
    console.log("findIndex", findIndex);

    if (findIndex < 0) {
      findSavedTasks.products.push(saveProduct.components[0]);
      res.status(202).json({ message: "хадгалсан бараа байн" });
      return;
    } else {
      const comp = saveProduct.components[0];
      console.log("comp", comp);
      findSavedTasks.products[findIndex].components.push(comp);
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

export const getCurrentTask = async (req: Request, res: Response) => {
  const { product_id } = req.body;

  try {
    const cart = await SavedTasks.findOne({});
    // console.log(id);
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
