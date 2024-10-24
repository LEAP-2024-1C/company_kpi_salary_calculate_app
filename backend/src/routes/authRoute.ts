import { Router } from "express";
import { createEmployee } from "../controllers/auth-controller";
// import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/employee").post(createEmployee);
export default router;
