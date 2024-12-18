import { Router } from "express";
import {
  createEmployee,
  getCurrentUser,
  login,
  getAllEmployees,
  verifyPassword,
  forgetPassword,
  verifyOtp,
  updateUserInfo,
  deleteUser,
} from "../controllers/auth-controller";

import { auth } from "../middlewares/auth";

const router = Router();

router.route("/create/employee").post(createEmployee).delete(deleteUser);
router.route("/get/employee").get(getAllEmployees);
router.route("/login").post(login);
router.route("/get-employee").get(auth, getCurrentUser);
router.route("/verify-password").post(verifyPassword);
router.route("/forget-password").post(forgetPassword);
router.route("/verify-otp").post(verifyOtp);
router.route("/update/profile").put(auth, updateUserInfo);
export default router;
