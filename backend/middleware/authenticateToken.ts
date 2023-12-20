import { Request, Response, NextFunction } from "express";
import tokenIsVerify from "../utils/VerifyToken";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenHeader = req.headers.cookie;

    if (!tokenHeader) {
      return res.status(401).json({
        error: true,
        showMessage: false,
        message: "Missing authorization header",
      });
      // next(new Error("Missing authorization header"));
    }

    const tokenParts = tokenHeader.split(" ");
    const [tokenCredential, user] = tokenParts;

    // if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    //   return res.status(401).json({
    //     error: true,
    //     showMessage: false,
    //     message: "Invalid token format",
    //   });
    //   next(new Error("Invalid token format"));
    // }

    let token = tokenCredential?.split("=")[1];
    token = token?.slice(0, -1);
    // console.log(token);
    // Here you can add code to validate the token, such as checking it against a database or decoding it.

    // verify the token
    const verifyToken = await tokenIsVerify(token ? token : "");
    // console.log(verifyToken);

    // If the token is valid, you can proceed to the next middleware or the route handler.

    // If the token is invalid, you can return a 401 response or handle it as needed.

    next();
  } catch (error: any) {
    // Handle any errors that occur within the try block here.
    console.log(error.message);
    if (error?.message === "jwt expired") {
      return res.status(401).json({
        error: true,
        showMessage: false,
        message: "jwt expired",
      });
    } else if (error?.message === "jwt malformed") {
      return res.status(500).json({
        error: true,
        showMessage: false,
        message: "Json Web Token error",
      });
    } else {
      return res.status(500).json({
        error: true,
        showMessage: false,
        message: "server internal error",
      });
    }
  }
}
