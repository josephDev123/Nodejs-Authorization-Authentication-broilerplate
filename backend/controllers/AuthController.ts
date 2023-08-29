import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import {
  isPasswordAlreadyTaken,
  isEmailAlreadyUsed,
} from "../utils/comparePassword";
import { UserModel } from "../models/Users";
import { registercredentialValidation } from "../utils/authDataValidation";
import { isRegisteredEmail } from "../utils/isRegisteredEmail";
import { isNameAlreadyReqistered } from "../utils/isNameRegistered";
import jwt from "jsonwebtoken";
import { string } from "joi";
import { createToken } from "../utils/createToken";
import UserProfile from "../models/UserProfile";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const isPasswordAlreadyUsed = await isPasswordAlreadyTaken(password);
    const isEmailUsed = await isEmailAlreadyUsed(email);

    const validationResult = await registercredentialValidation(
      name,
      email,
      password
    );

    if (validationResult.error) {
      // Handle validation error
      return res.json({ ValidationError: validationResult.error.message });
    }

    // console.log(isPasswordAlreadyUsed, isEmailUsed, hashedPassword);

    if (isPasswordAlreadyUsed === false && isEmailUsed === false) {
      const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({
        message: "New user created",
      });
    }
    console.log("already register");
    //secure:true, httpOnly:true
  } catch (error) {
    return res.json({ error: (error as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const validationResult = await registercredentialValidation(
      name,
      email,
      "Password@123"
    );

    if (validationResult.error) {
      // Handle validation error
      console.log("validation error");
      return res.json({ error: true, message: validationResult.error.message });
    }

    const new_Email = await isRegisteredEmail(email);
    if (new_Email === false) {
      console.log("The email is not yet registered");
      return res.json({
        error: true,
        message: "The email is not yet registered",
      });
    }

    const checkNameAlreadyRegistered = await isNameAlreadyReqistered(name);
    if (checkNameAlreadyRegistered === false) {
      console.log("The name is not yet registered");
      return res.json({
        error: true,
        message: "The name is not yet registered",
      });
    }
    const token = await createToken(email);
    const user = await UserModel.findOne({ email });

    console.log(user);

    res.cookie("token", token);

    return res.json({
      success: true,
      message: user,
    });
  } catch (error) {
    return res.json({
      error: true,
      message: (error as Error).message,
    });
  }
};
