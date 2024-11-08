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
