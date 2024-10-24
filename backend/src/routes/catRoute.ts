import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/cat-controller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/category").post(createCategory);
router.route("/get/category").get(getAllCategories);
export default router;
