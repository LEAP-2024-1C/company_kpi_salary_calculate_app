import { Request, Response } from "express";
import Category from "../models/category.model";
import Components, { ICategory } from "../models/components.model";
import Product, { IComponent, IProduct } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const { components, productForm, images } = req.body;
  try {
    console.log("first", components);

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

// export const getAllProductsStat = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.find().populate<IComponent>("components");
//     const productStat = products.map((c) => {
//       const comps = c.components
//         .map((x) => {
//           const status = {
//             pending: x.procedures.filter((s) => s.status === "pending").length,
//             progress: x.procedures.filter((s) => s.status === "progress")
//               .length,
//             done: x.procedures.filter((s) => s.status === "done").length,
//             review: x.procedures.filter((s) => s.status === "review").length,
//           };
//           return { status };
//         })
//         .reduce(
//           (acc, component) => {
//             acc.pending += component.status.pending;
//             acc.progress += component.status.progress;
//             acc.done += component.status.done;
//             acc.review += component.status.review;
//             return acc;
//           },
//           { pending: 0, progress: 0, done: 0, review: 0 }
//         );
//       const total = comps.done + comps.pending + comps.progress + comps.review;
//       return {
//         components: comps,
//         total: total,
//         productName: c.productName,
//         description: c.description,
//         image: c.images,
//       };
//     });

//     res.status(200).json({ message: "success", productStat });
//   } catch (error) {
//     res.status(401).json({ error });
//     console.error(error);
//   }
// };

// export const getAllProductsStatEmployee = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const products = await Product.find().populate<IComponent>("components");
//     const productStat = products.map((c) => {
//       const comps = c.components.map((x) => {
//         let pending = 0;
//         let progress = 0;
//         let done = 0;
//         let review = 0;

//         x.procedures.forEach((task) => {
//           pending += task.status.pending;
//           progress += task.status.progress;
//           done += task.status.done;
//           review += task.status.review;
//         });
//         return { pending, progress, done, review };
//       });
//       return {
//         components: comps,
//         productName: c.productName,
//         description: c.description,
//         image: c.images,
//       };
//     });

//     res.status(200).json({ message: "success", productStat });
//   } catch (error) {
//     res.status(401).json({ error });
//     console.error(error);
//   }
// };

export const getAllProductsStat = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate<IComponent>("components");
    const productStat = products.map((c) => {
      const comps = c.components
        .map((x) => {
          let pending = 0;
          let progress = 0;
          let done = 0;
          let review = 0;

          x.procedures.forEach((task) => {
            pending += task.status.pending;
            progress += task.status.progress;
            done += task.status.done;
            review += task.status.review;
          });
          return { pending, progress, done, review };
        })
        .reduce(
          (acc, component) => {
            acc.pending += component.pending;
            acc.progress += component.progress;
            acc.done += component.done;
            acc.review += component.review;
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
        createdAt: c.createdAt,
      };
    });

    res.status(200).json({ message: "success", productStat });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};
