import { Router } from "express";
import { register, loginController } from "../../controllers/AuthController";

export const AuthRoute = Router();

AuthRoute.post("/register", register);
AuthRoute.post("/login", loginController);
AuthRoute.post("/set-username", loginController);
AuthRoute.post("/otp", loginController);
AuthRoute.post("/confirm-otp", loginController);
AuthRoute.post("/profile-pic", loginController);
AuthRoute.post("/bio", loginController);
