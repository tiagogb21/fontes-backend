require("dotenv").config();
import express, { Response } from "express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";

import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.auth.route";
import projectRouter from "./routes/project.route";
import validateEnv from "./utils/validateEnv";
import redisClient from "./utils/redis/connectRedis";
import HandleError, { GetError } from "./utils/Errors/HandleError";
import { limit } from "./utils/data/constants";

AppDataSource.initialize()
  .then(async () => {
    validateEnv();

    const app = express();

    app.use(express.json({ limit }));

    app.use(cookieParser());

    app.use(cors());

    // ROUTES
    app.use(userRouter);
    app.use(projectRouter)

    // HEALTH CHECKER
    app.get("/api/healthChecker", async (_, res: Response) => {
      const message = await redisClient.get("try");
      res.status(200).json({
        status: "success",
        message,
      });
    });

    app.all("*", GetError);

    app.use(HandleError);

    const port = config.get<number>("port");

    app.listen(port, () => {
      console.log(`Server started on: http://localhost:${port}`);
    });
  })
  .catch((error: Error) => console.log(error));
