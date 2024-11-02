import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsStat,

  getCurrentProduct,
  // getAllProductsStatEmployee,
} from "../controllers/product-contoller";
import { auth } from "../middlewares/auth";


const router = Router();

router.route("/pro/product").post(createProduct).get(getAllProducts);
router.route("/product/stat").get(getAllProductsStat);
// router.route("/product/stat/employee").get(getAllProductsStatEmployee);
router.route("/product/:id").get(getCurrentProduct);


export default router;
