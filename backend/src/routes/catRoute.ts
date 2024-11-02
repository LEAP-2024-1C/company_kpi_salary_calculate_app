import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/cat-controller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/category").post(createCategory).delete(deleteCategory);
router.route("/get/category").get(getAllCategories);
export default router;
