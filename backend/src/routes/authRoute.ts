import { Router } from "express";
import { createEmployee, getCurrentUser, login, getAllEmployees} from "../controllers/auth-controller";

import { auth } from "../middlewares/auth";

const router = Router();

router.route("/create/employee").post(createEmployee);
router.route("/get/employee").get(getAllEmployees);
router.route("/login").post(login);
router.route("/get-employee").get(auth, getCurrentUser);
export default router;
