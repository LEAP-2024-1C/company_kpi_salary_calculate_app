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

export const addToCategory = async (req: Request, res: Response) => {
  const { c_id, procedures } = req.body;

  try {
    if (!c_id) {
      return res.status(400).json({ message: "Category ID not provided." });
    }

    const findCategory = await Category.findById(c_id);
    if (!findCategory) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    // Ensure procedures is an array and add each procedure to the existing list
    if (Array.isArray(procedures)) {
      findCategory.procedures.push(...procedures);
    } else {
      return res
        .status(400)
        .json({ message: "Procedures should be an array." });
    }

    // Save the updated category
    const updatedCategory = await findCategory.save();
    return res.status(200).json({
      message: "Successfully added to category.",
      updatedCategory,
    });
  } catch (error) {
    console.error("Error adding to category:", error);
    return res.status(500).json({
      message: "An error occurred while adding to the category.",
      error: error,
    });
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

export const updateProcedure = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const { c_id, t_id, updatedData } = data;

    // Validate input
    if (!c_id || !t_id || !updatedData) {
      return res.status(400).json({
        message:
          "Устгалт амжилтгүй: c_id, t_id, болон updatedData заавал байх ёстой.",
      });
    }

    const findCategory = await Category.findById(c_id);

    if (!findCategory) {
      return res.status(404).json({ message: "Ангилал олдсонгүй." });
    }

    // Find the procedure by t_id
    const procedure = findCategory.procedures.find(
      (proc) => proc._id.toString() === t_id
    );

    if (!procedure) {
      return res.status(404).json({ message: "Procedure олдсонгүй." });
    }

    // Update the procedure with the new data
    Object.assign(procedure, updatedData);

    await findCategory.save(); // Save the updated category

    return res.status(200).json({
      message: "Procedures амжилттай шинэчилэв.",
      updatedProcedure: procedure,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Алдаа гарлаа." });
  }
};

export const deleteProcedure = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const { c_id, t_id } = data;

    // Validate input
    if (!t_id || !c_id) {
      return res.status(400).json({
        message: "Устгалт амжилтгүй: c_id болон t_id заавал байх ёстой.",
      });
    }

    const findCategory = await Category.findById(c_id);

    if (!findCategory) {
      return res.status(404).json({ message: "Ангилал олдсонгүй." });
    }

    // Assuming `procedures` is an array and you want to remove an item by t_id
    const index = findCategory.procedures.findIndex(
      (proc) => proc._id.toString() === t_id
    );

    if (index === -1) {
      return res.status(404).json({ message: "Procedure олдсонгүй." });
    }

    const deletedProcedure = findCategory.procedures.splice(index, 1); // Remove the procedure

    await findCategory.save(); // Save the updated category

    console.log(deletedProcedure);
    return res.status(200).json({
      message: "Procedures амжилттай устгав.",
      deletedProcedure,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Алдаа гарлаа." });
  }
};
