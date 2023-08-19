import express, { Express, Request, Response } from "express";
import { dbConnection } from "./db";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRoute } from "./routes/authRoute";
import cookieParser from "cookie-parser";

dotenv.config();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

const startApp = async () => {
  try {
    await dbConnection();

    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });

    app.use("/auth", AuthRoute);
  } catch (error) {
    console.log(error);
  }
};

startApp();
