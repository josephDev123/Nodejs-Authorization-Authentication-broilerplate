import { Router } from "express";
import { register, loginController } from "../controllers/AuthController";

export const AuthRoute = Router();

AuthRoute.post("/register", register);
AuthRoute.post("/login", loginController);
