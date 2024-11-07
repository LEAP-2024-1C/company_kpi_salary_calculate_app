import { Router } from "express";

import { auth } from "../middlewares/auth";
import { updateComponent } from "../controllers/comp-controller";

const router = Router();

router.route("/update").post(updateComponent);

export default router;
