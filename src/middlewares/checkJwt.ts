import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];

  let jwtPayload;

  const publicKey = Buffer.from(
    config.get<string>('accessTokenPublicKey'),
    "base64"
  ).toString("ascii");

  jwtPayload = jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
  });

  res.locals.jwtPayload = jwtPayload;

  const { userId, username } = jwtPayload as any;

  const newToken = jwt.sign({ userId, username }, config.get('accessTokenPrivateKey'), {
    expiresIn: "1h"
  });

  res.setHeader("token", newToken);

  next();
};
