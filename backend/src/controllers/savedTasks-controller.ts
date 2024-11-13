import { Request, Response } from "express";
import SavedTasks from "../models/savedTasks.model";

export const createSavedTasks = async (req: Request, res: Response) => {
  const { id } = req.user; // Assuming `id` is from middleware attaching user data
  const { saveProduct } = req.body;

  try {
    const { product_id } = saveProduct;

    // Check if there are existing saved tasks for the user
    const findSavedTasks = await SavedTasks.findOne({ user: id });

    if (!findSavedTasks) {
      // No existing tasks, create a new entry
      const savedTasks = await SavedTasks.create({
        user: id,
        products: [saveProduct], // Wrap saveProduct in an array
      });

      return res.status(200).json({
        message: "Created new saved tasks",
        savedTasks,
      });
    }

    // Find the index of the product in existing saved tasks
    const findIndex = findSavedTasks.products.findIndex(
      (item) => item.product_id.toString() === product_id.toString()
    );

    if (findIndex < 0) {
      // Product not found, add it to the list
      findSavedTasks.products.push(saveProduct);
      const updatedSavedTasks = await findSavedTasks.save();

      return res.status(200).json({
        message: "Added new product to saved tasks",
        updatedSavedTasks,
      });
    }

    // Update existing product's components and procedures
    const comp_id = saveProduct.components[0]._id;
    const newProcedures = saveProduct.components[0].procedures;

    const existingComponents = findSavedTasks.products[findIndex].components;

    // Find and update the matching component
    const component = existingComponents.find(
      (item) => item._id.toString() === comp_id.toString()
    );

    if (component) {
      // Update existing procedures
      component.procedures.forEach((task) => {
        const procIdx = newProcedures.findIndex(
          (proc: any) => proc._id.toString() === task._id.toString()
        );
        if (procIdx > -1) {
          // Increment the status.assign value
          task.status.assign += newProcedures[procIdx].status.assign;
        }
      });
    } else {
      // Add the new component if not found
      existingComponents.push(saveProduct.components[0]);
    }

    const updatedSavedTasks = await findSavedTasks.save();

    return res.status(200).json({
      message: "Updated saved tasks",
      updatedSavedTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Failed to create or update saved tasks",
    });
  }
};

export const getCurrentTask = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const currentSavedTask = await SavedTasks.findOne({ user: id });

    res.status(200).json({
      message: "Employee saved tasks is read successfully",
      cart: currentSavedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "failed to get saved tasks data",
    });
  }
};
export const getSelectedTasks = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  try {
    const allTasks = await SavedTasks.find().populate("user");
    const matchingTasks = allTasks.map((task) => {
      const filteredPro = task.products.filter(
        (product) => product.product_id.toString() === product_id.toString()
      );
      return { user: task.user, products: filteredPro };
    });

    res.status(200).json({
      message: "Employee saved tasks is read successfully",
      matchingTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "failed to get saved tasks data",
    });
  }
};
export const getAllSavedTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await SavedTasks.find().populate("user");

    res.status(200).json({
      message: "Employee saved tasks is read successfully",
      allTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "failed to get saved tasks data",
    });
  }
};

// export const updateSavedTasksEmployee = async (req: Request, res: Response) => {
//   const { id } = req.user;
//   const { data } = req.body;
//   const { component_id, product_id, task_id } = data;
//   if (!product_id || !component_id || !task_id) {
//     return res.status(400).json({
//       message: "Missing required fields: product_id, comp_id, or task_id",
//     });
//   }
//   try {
//     const savedTasks = await SavedTasks.findOne({ user: id });
//     if (!savedTasks) {
//       return res.status(400).json({
//         message: "not found saved tasks",
//       });
//     }
//     const findProductId = savedTasks.products.findIndex(
//       (pro) => pro.product_id.toString() === product_id.toString()
//     );
//     if (findProductId < 0) {
//       return res
//         .status(400)
//         .json({ message: "not found product in saved tasks" });
//     }
//     const product = savedTasks.products[findProductId];

//     const findCompId = product.components.findIndex(
//       (item) => item._id.toString() === component_id.toString()
//     );
//     if (findCompId < 0) {
//       return res
//         .status(400)
//         .json({ message: "not found component in product" });
//     }

//     const component = product.components[findCompId];
//     const findTaskid = component.procedures.findIndex(
//       (item) => item._id.toString() === task_id.toString()
//     );
//     const procedure = component.procedures[findTaskid];
//     procedure.taskStatus = "review";
//     const updatedSavedTasks = await savedTasks.save();
//     res.status(200).json({
//       message: "updated saved tasks",
//       updatedSavedTasks,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: "failed to get saved tasks",
//     });
//   }
// };

// export const updateSavedTasksAdmin = async (req: Request, res: Response) => {
//   const { product_id } = req.params;
//   const { data } = req.body;
//   const { component_id, task_id, user_id } = data;
//   if (!product_id || !component_id || !task_id || !user_id) {
//     return res.status(400).json({
//       message: "Missing required fields: product_id, comp_id, or task_id",
//     });
//   }
//   try {
//     const savedTasks = await SavedTasks.findOne({ user: user_id });
//     if (!savedTasks) {
//       return res.status(400).json({
//         message: "not found saved tasks",
//       });
//     }
//     const findProductId = savedTasks.products.findIndex(
//       (pro) => pro.product_id.toString() === product_id.toString()
//     );
//     if (findProductId < 0) {
//       return res
//         .status(400)
//         .json({ message: "not found product in saved tasks" });
//     }
//     const product = savedTasks.products[findProductId];

//     const findCompId = product.components.findIndex(
//       (item) => item._id.toString() === component_id.toString()
//     );
//     if (findCompId < 0) {
//       return res
//         .status(400)
//         .json({ message: "not found component in product" });
//     }

//     const component = product.components[findCompId];
//     const findTaskid = component.procedures.findIndex(
//       (item) => item._id.toString() === task_id.toString()
//     );
//     const procedure = component.procedures[findTaskid];
//     procedure.taskStatus = "done";
//     const updatedSavedTasks = await savedTasks.save();
//     res.status(200).json({
//       message: "updated saved tasks",
//       updatedSavedTasks,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: "failed to get saved tasks",
//     });
//   }
// };
