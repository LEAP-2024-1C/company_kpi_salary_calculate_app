import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsStat,
  // getAllProductsStatEmployee,
} from "../controllers/product-contoller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/pro/product").post(createProduct).get(getAllProducts);
router.route("/product/stat").get(getAllProductsStat);
// router.route("/product/stat/employee").get(getAllProductsStatEmployee);

export default router;
