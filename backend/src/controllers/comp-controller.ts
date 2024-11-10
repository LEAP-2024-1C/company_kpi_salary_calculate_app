import { Request, Response } from "express";
import Components, { ITask } from "../models/components.model";

export const updateComponent = async (req: Request, res: Response) => {
  const { updateComp } = req.body;
  console.log("first", updateComp);
  const { component_id, procedures } = updateComp;
  try {
    const component = await Components.findById(component_id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
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
  const { compStatus } = req.body;

  if (
    !compStatus ||
    !compStatus.component_id ||
    !compStatus.task_id ||
    !compStatus.assign
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  const { component_id, assign, task_id } = compStatus;
  try {
    const component = await Components.findById(component_id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    const fIndx = component.procedures.findIndex(
      (p) => p._id.toString() === task_id.toString()
    );
    if (fIndx < 0) {
      return res.status(404).json({ message: "task not found in component" });
    }
    const procedure = component.procedures[fIndx];
    if (procedure.status.progress < assign) {
      return res
        .status(400)
        .json({ message: "Insufficient progress to reassign to review" });
    }

    procedure.status.progress -= assign;
    procedure.status.review += assign;

    await component.save();
    res.status(200).json({
      message: "Product updated successfully",
      updatedComponent: component,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const updateProductStatusAdmin = async (req: Request, res: Response) => {
  const { compStatus } = req.body;
  console.log("compstatus", compStatus);
  if (
    !compStatus ||
    !compStatus.component_id ||
    !compStatus.task_id ||
    !compStatus.assign
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  const { component_id, assign, task_id } = compStatus;
  try {
    const component = await Components.findById(component_id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    const fIndx = component.procedures.findIndex(
      (p) => p._id.toString() === task_id.toString()
    );
    if (fIndx < 0) {
      return res.status(404).json({ message: "task not found in component" });
    }
    const procedure = component.procedures[fIndx];
    if (procedure.status.progress < assign) {
      return res
        .status(400)
        .json({ message: "Insufficient progress to reassign to review" });
    }

    procedure.status.review -= assign;
    procedure.status.done += assign;

    await component.save();
    res.status(200).json({
      message: "Product updated successfully",
      updatedComponent: component,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};
