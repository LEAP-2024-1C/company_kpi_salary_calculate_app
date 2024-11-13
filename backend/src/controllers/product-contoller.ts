import { Request, Response } from "express";

import Components from "../models/components.model";
import Product, { IComponent } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const { components, productForm, images } = req.body;
  try {
    const createdComp = await Components.insertMany(components);

    const compIDs = createdComp.map((item) => item._id);

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

    res.status(200).json({ message: "success", products });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const getCurrentProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const oneProductDatas = await Product.findById(id).populate("components");

    res
      .status(200)
      .json({ message: "Success to get a product", oneProductDatas });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "failed to get a product",
    });
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
        let status = {
          pending: 0,
          progress: 0,
          done: 0,
          review: 0,
        };

        x.procedures.forEach((task) => {
          status.pending += task.status.pending;
          status.progress += task.status.progress;
          status.done += task.status.done;
          status.review += task.status.review;
        });
        const total =
          status.done + status.pending + status.progress + status.review;
        const other = total - status.pending;
        return { total, other, categoryName: x.categoryName, cat_id: x._id };
      });
      return {
        components: comps,
        productName: c.productName,
        description: c.description,
        image: c.images,
        _id: c._id,
      };
    });

    res.status(200).json({ message: "success", productStat });
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
        product_id: c._id,
        productName: c.productName,
        description: c.description,
        image: c.images,
        createdAt: c.createdAt,
      };
    });

    res.status(200).json({ message: "success", productStat, products });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { p_id } = req.body;

  try {
    // Validate input
    if (!p_id) {
      return res.status(400).json({
        message: "Устгалт амжилтгүй: p_id  заавал байх ёстой.",
      });
    }

    // Find the product by ID
    const findProduct = await Product.findByIdAndDelete(p_id);

    return res.status(200).json({
      message: "Бүтээгдэхүүн амжилттай устгав.",
      deletedProduct: findProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Алдаа гарлаа." });
  }
};

// export const getProductName = async (req: Request, res: Response) => {
//   const data = req.body;
//   console.log("req", req.body);
//   try {
//     const { productName } = data;
//     const findProductName = await Product.find({ productName });
//   } catch (error) {}
// };

// export const updateProduct = async (req: Request, res: Response) => {
//   const { component_id, pro } = req.body;
//   const { _id } = pro;
//   const products = await Components.findById(component_id);

//   const newProc = products?.procedures.map((p) => {
//     const fpId = pro.findIndex((f) => f._id === p._id);
//     if (fpId > -1) {
//       return pro[fpId];
//     }
//     return p;
//   }); // [1,2,3,4]
//   products?.procedures = newProc;
//   products?.save();
// };

// export const getAllProductsStatEmployee = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const products = await Product.find().populate<IComponent>("components");
//     const productStat = products.map((c) => {
//       const comps = c.components.map((x) => {
//         const status = {
//           pending: x.procedures.filter((s) => s.status === "pending").length,
//           progress: x.procedures.filter((s) => s.status === "progress").length,
//           done: x.procedures.filter((s) => s.status === "done").length,
//           review: x.procedures.filter((s) => s.status === "review").length,
//         };
//         const total =
//           status.done + status.pending + status.progress + status.review;
//         const other = total - status.pending;
//         return {
//           categoryName: x.categoryName,
//           cat_id: x._id,
//           total,
//           other,
//         };
//       });
//       return {
//         components: comps,
//         productName: c.productName,
//         description: c.description,
//         image: c.images,
//         createdAt:c.createdAt,
//         quantity:c.quantity,
//         _id:c._id
//       };
//     });

//     res.status(200).json({ message: "success", productStat ,products});
//   } catch (error) {
//     res.status(401).json({ error });
//     console.error(error);
//   }
// };
