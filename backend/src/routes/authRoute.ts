import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  login,
} from "../controllers/auth-controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.route("/create/employee").post(createEmployee);
router.route("/get/employee").get(getAllEmployees);
router.route("/login").post(login);
export default router;
