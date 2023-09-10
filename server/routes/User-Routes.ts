import express from "express";
import { login, signup, logout, forgotPassword, resetPassword,getUserDetails } from "../controllers/user-controller";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetpassword/:token").post(resetPassword);
router.route("/verify/:token").get(getUserDetails)
export default router;