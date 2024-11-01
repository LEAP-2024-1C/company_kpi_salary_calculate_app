import { Request, Response } from "express";
import SavedTasks from "../models/savedTasks.model";


export const createSavedTasks = async (req: Request, res: Response) => {
  const { userId, productId,categoryId,taskId,quantity} = req.body;
  try {
    const findSavedTasks = await SavedTasks.findOne({ user: userId });

    if (!findSavedTasks) {
      const savedTasks = await SavedTasks.create({
        user: userId,
        products: { product: productId, components:[]},
        categories:{category:categoryId,procedures:[]},
        procedures:{task:taskId,quantity}
      });
      console.log(savedTasks);
      return res.status(200).json({
        message: "created new savedTasks",
        savedTasks,
      });
    }

    const findDuplicated = findSavedTasks.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (findDuplicated > -1) {
        findSavedTasks.products[findDuplicated];
    } else {
        findSavedTasks.products.push({ product: productId});
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
    const cart = await SavedTasks.findOne({ user: id }).populate("categories.category");
    console.log(id);
    res.status(200).json({
      message: "Employee saved tasks is read successfully",
      cart: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "failed to get saved tasks data",
    });
  }
};

export const updateSavedTasks = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { taskId, newQuantity } = req.body;
  try {
    const savedTasks = await SavedTasks.findOne({ user: id });
    if (!savedTasks) {
      return res.status(400).json({
        message: "not found user",
      });
    }

    const findTask = savedTasks.procedures.findIndex(
      (item) => item.task.toString() === taskId
    );

    savedTasks.procedures[findTask].quantity = newQuantity;

    const updatedSavedTasks = await savedTasks.save();
    res.status(200).json({
      message: "updated saved tasks",
      updatedSavedTasks,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to get saved tasks",
    });
  }
};