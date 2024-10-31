import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createSavedTasks, getUserSavedTasks, updateSavedTasks } from "../controllers/savedTasks-controller";

const router = Router();

router.route("/create-cart").post(createSavedTasks);
router.route("/get-cart").get(auth, getUserSavedTasks);
router.route("/update-cart").put(auth, updateSavedTasks);

export default router;