import { Request, Response } from "express";
import Category from "../models/category.model";

export const createCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const { categoryName, procedures } = data;
    if (!categoryName || !procedures) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    const findCategory = await Category.findOne({ categoryName });
    if (!findCategory) {
      const category = await Category.create({
        categoryName,
        procedures,
      });
      return res.status(200).json({
        message: "created new category",
        category,
      });
    }
    res
      .status(400)
      .json({ message: "Категорийн нэр давхацаж байна нэрээ өөрчилнө үү" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const { cat_id, task_id, taskName, unitPrice, status, quantity } = data;
    if (!cat_id || !taskName || !unitPrice || !status || quantity) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    const findCategory = await Category.findOne({ cat_id });
    if (!findCategory) {
      return res.status(400).json({
        message: "Категори олдсонгүй",
      });
    }
    const procedures = findCategory?.procedures;
    const findIndex = procedures?.findIndex(
      (item) => item._id?.toString() === task_id
    );
    if (findIndex === -1) {
      return res.status(400).json({ message: "task oldsongui" });
    }
    if (procedures[findIndex].status !== status) {
      procedures[findIndex].status = status;
      const updatedStatus = await findCategory.save();
      res
        .status(200)
        .json({ message: "update status completely", updatedStatus });
      return;
    }
    procedures[findIndex].status = status;
    procedures[findIndex].taskName = taskName;
    procedures[findIndex].quantity = quantity;
    procedures[findIndex].unitPrice = unitPrice;
    const updatedStatus = await findCategory.save();
    res
      .status(200)
      .json({ message: "update status completely", updatedStatus });
    return;
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "success", categories });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const { c_id, t_id } = data;
    if (!t_id || !c_id) {
      return res.status(400).json({ message: " Устгалт амжилтгүй" });
    }
    const findCategory = await Category.findOne({ c_id });
    if (findCategory) {
      const category = await Category.deleteOne({
        t_id,
      });
      return res.status(200).json({
        message: "deleted procedure",
      });
    }
    res
      .status(400)
      .json({ message: "Категорийн нэр давхацаж байна нэрээ өөрчилнө үү" });
  } catch (error) {
    res.status(404).json({ error });
  }
};
