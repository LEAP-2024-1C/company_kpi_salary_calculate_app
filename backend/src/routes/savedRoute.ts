import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createSavedTasks,
  getCurrentTask,
} from "../controllers/savedTasks-controller";

const router = Router();

router.route("/save/employee/task").post(auth, createSavedTasks);
router.route("/savedTask").get(auth, getCurrentTask);

export default router;
