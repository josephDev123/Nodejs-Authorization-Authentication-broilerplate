import { Router } from "express";
import { register } from "../controllers/AuthController";

export const AuthRoute = Router();

AuthRoute.post("/register", register);
