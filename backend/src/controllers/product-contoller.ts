import { Request, Response } from "express";
import Category, { ICategory } from "../models/category.model";
import Components from "../models/components.model";
import Product, { IPopulatedPro } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const { components, productForm, images } = req.body;
  try {
    console.log("first", components);
    const createdComp = await Components.insertMany(components);

    const compIDs = createdComp.map((item) => item._id);
    console.log("res", res);
    const { productName, description, quantity } = productForm;
    const createProduct = await Product.create({
      productName,
      description,
      quantity,
      components: compIDs,
      images,
    });
    res.status(200).json({
      message: "created new category",
      createProduct,
    });
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
      (item) => item.task_id?.toString() === task_id
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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("components");

    console.log("product", products);
    res.status(200).json({ message: "success", products });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const getAllProductsStat = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate<IPopulatedPro>("components");
    const components = products.map((product) =>
      product.components.map((component: ICategory) => {
        const statusCounts = {
          pending: component.procedures.filter(
            (task) => task.status === "pending"
          ).length,
          progress: component.procedures.filter(
            (task) => task.status === "progress"
          ).length,
          done: component.procedures.filter((task) => task.status === "done")
            .length,
          review: component.procedures.filter(
            (task) => task.status === "review"
          ).length,
        };
        return {
          statusCounts,
        };
      })
    );
    res.status(200).json({ message: "success", components });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};
