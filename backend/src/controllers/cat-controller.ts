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
    } else {
    }
  } catch (error) {
    res.status(401).json({ error });
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
