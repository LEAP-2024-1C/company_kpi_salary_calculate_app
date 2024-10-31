import { Request, Response } from "express";
import SavedTasks from "../models/savedTasks.model";


export const createSavedTasks = async (req: Request, res: Response) => {
  const { userId, productId, totalAmount, quantity } = req.body;
  try {
    const findSavedTasks = await SavedTasks.findOne({ user: userId });

    if (!findSavedTasks) {
      const savedTasks = await SavedTasks.create({
        user: userId,
        products: { product: productId, quantity },
        totalAmount,
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
        findSavedTasks.products[findDuplicated].quantity += quantity;
    } else {
        findSavedTasks.products.push({ product: productId, quantity });
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
    const cart = await SavedTasks.findOne({ user: id }).populate("products.product");
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
  const { productId, newQuantity } = req.body;
  try {
    const savedTasks = await SavedTasks.findOne({ user: id });
    if (!savedTasks) {
      return res.status(400).json({
        message: "not found user",
      });
    }

    const findProduct = savedTasks.products.findIndex(
      (item) => item.product.toString() === productId
    );

    savedTasks.products[findProduct].quantity = newQuantity;

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