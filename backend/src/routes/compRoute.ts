import { Router } from "express";

import { auth } from "../middlewares/auth";
import {
  updateComponent,
  updateProductStatusAdmin,
  updateProductStatusEmployee,
} from "../controllers/comp-controller";

const router = Router();

router.route("/update").put(auth, updateComponent);
router.route("/update/status/employee").put(auth, updateProductStatusEmployee);
router.route("/update/status/admin").put(updateProductStatusAdmin);

export default router;
