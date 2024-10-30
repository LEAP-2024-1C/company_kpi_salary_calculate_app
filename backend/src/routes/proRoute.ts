import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product-contoller";
import { auth } from "../middlewares/auth";


const router = Router();

router.route("/pro/product").post(createProduct).get(auth, getAllProducts);
router.route("pro/product/:productId").get(getProduct)

export default router;
