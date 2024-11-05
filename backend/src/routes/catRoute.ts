import { Router } from "express";
import {
  createCategory,
  deleteProcedure,
  getAllCategories,
  updateProcedure,
} from "../controllers/cat-controller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/category").post(createCategory);
router.route("/procedure").delete(deleteProcedure).put(updateProcedure);
router.route("/get/category").get(getAllCategories);
export default router;
