import { Request, Response } from "express";
import Category from "../models/category.model";
import Components, { ICategory } from "../models/components.model";
import Product, { IComponent, IProduct } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const { components, productForm, images } = req.body;
  try {
    console.log("first", components);
    const { categoryName } = components;
    if (!categoryName) {
      return res.status(404).json({ message: "Хоосон утга байж болохгүй" });
    }

    const createdComp = await Components.insertMany(components);
    console.log("createdcomp", createdComp);
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
    const products = await Product.find().populate<IComponent>("components");
    const productStat = products.map((c) => {
      const comps = c.components
        .map((x) => {
          const status = {
            pending: x.procedures.filter((s) => s.status === "pending").length,
            progress: x.procedures.filter((s) => s.status === "progress")
              .length,
            done: x.procedures.filter((s) => s.status === "done").length,
            review: x.procedures.filter((s) => s.status === "review").length,
          };
          return { status };
        })
        .reduce(
          (acc, component) => {
            acc.pending += component.status.pending;
            acc.progress += component.status.progress;
            acc.done += component.status.done;
            acc.review += component.status.review;
            return acc;
          },
          { pending: 0, progress: 0, done: 0, review: 0 }
        );
      const total = comps.done + comps.pending + comps.progress + comps.review;
      return {
        components: comps,
        total: total,
        productName: c.productName,
        description: c.description,
        image: c.images,
      };
    });

    res.status(200).json({ message: "success", productStat });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const getAllProductsStatEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await Product.find().populate<IComponent>("components");
    const productStat = products.map((c) => {
      const comps = c.components.map((x) => {
        const status = {
          pending: x.procedures.filter((s) => s.status === "pending").length,
          progress: x.procedures.filter((s) => s.status === "progress").length,
          done: x.procedures.filter((s) => s.status === "done").length,
          review: x.procedures.filter((s) => s.status === "review").length,
        };
        const total =
          status.done + status.pending + status.progress + status.review;
        const other = total - status.pending;
        return {
          categoryName: x.categoryName,
          cat_id: x._id,
          total,
          other,
        };
      });
      return {
        components: comps,
        productName: c.productName,
        description: c.description,
        image: c.images,
      };
    });

    res.status(200).json({ message: "success", productStat });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};
