import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createSavedTasks,
  getUserSavedTasks,
} from "../controllers/savedTasks-controller";

const router = Router();

router.route("/save/employee/task").post( createSavedTasks);
router.route("/get-savedTaks").get(auth, getUserSavedTasks);

export default router;
