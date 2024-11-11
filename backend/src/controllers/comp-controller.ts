import { Request, Response } from "express";
import Components, { ITask } from "../models/components.model";
import mongoose from "mongoose";
import SavedTasks from "../models/savedTasks.model";

export const updateComponent = async (req: Request, res: Response) => {
  const { updateComp } = req.body;

  const { component_id, procedures } = updateComp;
  try {
    const component = await Components.findById(component_id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }

    for (const p of component.procedures) {
      const updatedProc = procedures.find(
        (f: ITask) => f._id.toString() === p._id.toString()
      );
      if (updatedProc && updatedProc.status.pending > p.status.pending) {
        return res.status(400).json({
          message:
            "Update your data: pending value is lower than the current value.",
        });
      }
    }
    const newProc = component.procedures.map((p) => {
      const fpId = procedures.findIndex(
        (f: ITask) => f._id.toString() === p._id.toString()
      );
      if (fpId > -1) {
        return procedures[fpId];
      }
      return p;
    });
    component.procedures = newProc;
    await component.save();
    res.status(200).json({
      message: "Product updated successfully",
      updatedComponent: component,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const updateProductStatusEmployee = async (
  req: Request,
  res: Response
) => {
  const { id } = req.user;
  const { compStatus } = req.body;

  const { component_id, assign, task_id, product_id } = compStatus;

  if (!product_id || !component_id || !task_id || !assign || !id) {
    return res.status(400).json({
      message: "Missing required fields: product_id, comp_id, or task_id",
    });
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const component = await Components.findById(component_id).session(session);
    if (!component) {
      throw new Error("Component not found");
    }
    const fIndx = component.procedures.findIndex(
      (p) => p._id.toString() === task_id.toString()
    );
    if (fIndx < 0) {
      throw new Error("Task not found in component");
    }
    const procedure = component.procedures[fIndx];
    if (procedure.status.progress < assign) {
      throw new Error("Insufficient progress to reassign to review");
    }

    procedure.status.progress -= assign;
    procedure.status.review += assign;

    await component.save({ session });

    const savedTasks = await SavedTasks.findOne({ user: id }).session(session);
    if (!savedTasks) {
      throw new Error("Saved tasks not found");
    }

    const productIndex = savedTasks.products.findIndex(
      (pro) => pro.product_id.toString() === product_id.toString()
    );
    if (productIndex < 0) {
      throw new Error("Product not found in saved tasks");
    }

    const product = savedTasks.products[productIndex];
    const componentIndex = product.components.findIndex(
      (comp) => comp._id.toString() === component_id.toString()
    );
    if (componentIndex < 0) {
      throw new Error("Component not found in product");
    }

    const savedComponent = product.components[componentIndex];
    const taskIndex = savedComponent.procedures.findIndex(
      (item) => item._id.toString() === task_id.toString()
    );

    if (taskIndex < 0) {
      throw new Error("Task not found in saved component");
    }

    const savedProcedure = savedComponent.procedures[taskIndex];
    savedProcedure.taskStatus = "review";

    await savedTasks.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    res.status(200).json({
      message: "Successfully updated task status",
      updatedComponent: component,
      updatedSavedTasks: savedTasks,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ message: "Failed to update task status", error });
  } finally {
    session.endSession();
  }
};

export const updateProductStatusAdmin = async (req: Request, res: Response) => {
  const { compStatus } = req.body;
  const { pro_id } = req.params;
  const { component_id, task_id, assign, user_id } = compStatus;
  if (!component_id || !task_id || !assign || !user_id || !pro_id) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const component = await Components.findById(component_id).session(session);
    if (!component) {
      throw new Error("Component not found");
    }
    const fIndx = component.procedures.findIndex(
      (p) => p._id.toString() === task_id.toString()
    );
    if (fIndx < 0) {
      throw new Error("Task not found in component");
    }
    const procedure = component.procedures[fIndx];
    console.log("review", procedure.status.review);
    if (procedure.status.review < assign) {
      throw new Error("Insufficient progress to reassign to review");
    }

    procedure.status.review -= assign;
    procedure.status.done += assign;

    await component.save({ session });

    const savedTasks = await SavedTasks.findOne({ user: user_id }).session(
      session
    );
    if (!savedTasks) {
      throw new Error("Saved tasks not found");
    }

    const productIndex = savedTasks.products.findIndex(
      (pro) => pro.product_id.toString() === pro_id.toString()
    );
    if (productIndex < 0) {
      throw new Error("Product not found in saved tasks");
    }

    const product = savedTasks.products[productIndex];
    const componentIndex = product.components.findIndex(
      (comp) => comp._id.toString() === component_id.toString()
    );
    if (componentIndex < 0) {
      throw new Error("Component not found in product");
    }

    const savedComponent = product.components[componentIndex];
    const taskIndex = savedComponent.procedures.findIndex(
      (item) => item._id.toString() === task_id.toString()
    );

    if (taskIndex < 0) {
      throw new Error("Task not found in saved component");
    }

    const savedProcedure = savedComponent.procedures[taskIndex];
    savedProcedure.taskStatus = "done";

    await savedTasks.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    res.status(200).json({
      message: "Successfully updated task status",
      updatedComponent: component,
      updatedSavedTasks: savedTasks,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    res.status(500).json({ message: "Failed to update task status", error });
  } finally {
    session.endSession();
  }
};
