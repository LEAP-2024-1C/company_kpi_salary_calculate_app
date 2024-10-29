import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product-contoller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/pro/product").post(createProduct).get(getAllProducts);

export default router;
