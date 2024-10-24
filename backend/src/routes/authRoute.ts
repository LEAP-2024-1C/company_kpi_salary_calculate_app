import { Router } from "express";
import { createEmployee, login } from "../controllers/auth-controller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/employee").post(createEmployee);
router.route("/login").post(login);
export default router;
