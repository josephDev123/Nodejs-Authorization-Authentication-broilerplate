import { Router } from "express";
import {
  register,
  loginController,
  ConfirmOtp,
  refresh_token,
} from "../../controllers/AuthController";

export const AuthRoute = Router();

AuthRoute.post("/register", register);
AuthRoute.post("/confirm-otp", ConfirmOtp);
AuthRoute.post("/login", loginController);
AuthRoute.post("/set-username", loginController);
AuthRoute.post("/profile-pic", loginController);
AuthRoute.get("/refresh-access-token", refresh_token);
