import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyEmail,
} from "../controllers/user.controllers.js";

const authRouter = Router();

authRouter.route("/register-user").post(registerUser);
authRouter.route("/loginUser").post(loginUser);
authRouter.route("/logoutUser").post(logoutUser);
authRouter.route("/get-current-user").post(getCurrentUser);
authRouter.route("/verifyEmail").post(verifyEmail);

export default authRouter;
