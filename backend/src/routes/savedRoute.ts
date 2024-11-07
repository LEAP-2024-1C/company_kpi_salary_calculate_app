import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createSavedTasks,
  getCurrentTask,
} from "../controllers/savedTasks-controller";

const router = Router();

router.route("/save/employee/task").post(createSavedTasks);
router.route("/get-savedTasks").get(getCurrentTask);

export default router;
