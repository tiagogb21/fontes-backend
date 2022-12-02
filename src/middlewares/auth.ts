import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { UserService } from "../services/user.service";
import HttpStatus from 'http-status-codes';

const userService = new UserService();

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.access_token;

    if (!token) {
      throw new Error("Please authenticate.");
    }

    const publicKey = Buffer.from(
      config.get<string>('accessTokenPublicKey'),
      "base64"
    ).toString("ascii");

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });

    if (!decoded) {
      throw new Error("Please authenticate.");
    }

    const { sub } = decoded;

    const user = await userService.findUserById(sub as string);

    if (!user) {
      throw new Error("Please authenticate.");
    }

    req.token = token;
    req.user = user;

    next()
  } catch (error) {
    return res.status(401).send({ error: 'Por favor, faça login ou crie uma conta.' });
  }
}

export default auth;
