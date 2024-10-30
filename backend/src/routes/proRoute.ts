import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsStat,
} from "../controllers/product-contoller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/pro/product").post(createProduct).get(getAllProducts);
router.route("/stat").get(getAllProductsStat);

export default router;
