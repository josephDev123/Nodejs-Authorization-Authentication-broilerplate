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
import mongoose from "mongoose";
import { profile } from "console";
import { randomBytes, randomUUID } from "crypto";
import { sendMail } from "../utils/sendMail";
import { generateRandomPIN } from "../utils/generateRandomPin";

export const register = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  try {
    const transactions = await session.withTransaction(async () => {
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
        return res.json({
          error: true,
          showMessage: true,
          message: validationResult.error.message,
        });
      }

      // console.log(isPasswordAlreadyUsed, isEmailUsed, hashedPassword);

      if (isPasswordAlreadyUsed === false && isEmailUsed === false) {
        const newUser = new UserModel({
          name: name,
          email: email,
          password: hashedPassword,
        });
        const user = await newUser.save({ session });

        const userProfile = new UserProfile({
          user_id: user._id,
        });
        await userProfile.save({ session });

        const newUserWithProfile = await UserModel.updateOne(
          { _id: user._id },
          { profile: userProfile._id }
        ).session(session);

        // send otp to mail
        const otp = generateRandomPIN();
        const payload = { email: email, otp: otp };
        // const messageId = await sendMail(payload);
        const updatedValue = `${otp}`;
        const storedOtp = await UserModel.updateOne(
          { _id: user._id },
          { otp: updatedValue }
        ).session(session);

        if (storedOtp) {
          // Email sent successfully
          await sendMail(payload);
          console.log("Email sent successfully!");
        } else {
          // Handle the case where sending the email failed

          console.log("Failed to send otp email");
          return res.status(500).json({
            error: true,
            showMessage: true,
            message: "Failed to send otp email",
          });
        }

        const userAndProfile = await UserModel.findOne({ email })
          // .populate("profile")
          .session(session);
        const userAndProfileJSON = JSON.stringify(userAndProfile);

        res.cookie("user", userAndProfileJSON);
        await session.commitTransaction();

        session.endSession();

        return res.status(201).json({
          error: false,
          showMessage: true,
          message: "New user created",
          // data: userAndProfile,
        });
      } else {
        session.endSession();
        console.log("Already registered");
        return res.status(400).json({
          error: true,
          showMessage: true,
          message: "Already registered",
        });
      }
    }); //secure:true, httpOnly:true

    if (transactions) {
      console.log("The transaction was successful");
    }
  } catch (error) {
    // await session.abortTransaction();
    console.log("Oops");
    session.endSession();
    return res.json({
      error: true,
      showMessage: false,
      message: (error as Error).message,
    });
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
    const user_id = await UserModel.findOne({ email }, "_id");
    const userProfile = await UserProfile.findOne({
      user_id: user_id?._id,
    }).populate("user_id");

    res.cookie("token", token);

    return res.json({
      success: true,
      message: userProfile,
    });
  } catch (error) {
    return res.json({
      error: true,
      message: (error as Error).message,
    });
  }
};

export const SendOtp = (req: Request, res: Response) => {
  console.log("otp");
};
