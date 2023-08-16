import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import {
  isPasswordAlreadyTaken,
  isEmailAlreadyUsed,
} from "../utils/comparePassword";
import { UserModel } from "../models/Users";
import { registercredentialValidation } from "../utils/authDataValidation";

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
      const newUser = await UserModel.insertMany({
        name: name,
        email: email,
        password: hashedPassword,
      });
    }
    //secure:true, httpOnly:true
    return res.status(201).json({
      message: "New user created",
    });
    // const user = await newUser().save();
  } catch (error) {
    return res.json({ error: (error as Error).message });
  }
};
