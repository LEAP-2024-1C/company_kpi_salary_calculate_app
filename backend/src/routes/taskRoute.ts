import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createSavedTasks,
  getAllSavedTasks,
  getCurrentTask,
  getSelectedTasks,
  updateSavedTasksAdmin,
} from "../controllers/savedTasks-controller";

const router = Router();

router.route("/save/employee/task").post(auth, createSavedTasks);
router.route("/savedTask").get(auth, getCurrentTask);
router.route("/all/tasks").get(getAllSavedTasks);
router.route("/picked/tasks/:product_id").get(getSelectedTasks);
router.route("/picked/employee/:product_id").put(updateSavedTasksAdmin);

export default router;