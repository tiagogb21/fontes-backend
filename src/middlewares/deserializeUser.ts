import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import AppError from '../utils/Errors/AppError';
import redisClient from '../utils/redis/connectRedis';
import { verifyJwt } from '../utils/jwt/jwt';
import { invalidToken, invalidTokenOrSession, notLoggedIn } from '../utils/data/constants';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError(HttpStatus.UNAUTHORIZED, notLoggedIn));
    }

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'accessTokenPublicKey'
    );

    if (!decoded) {
      return next(new AppError(HttpStatus.UNAUTHORIZED, invalidToken));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(HttpStatus.UNAUTHORIZED, invalidTokenOrSession));
    }

    const user = await userService.findUserById(JSON.parse(session).id);

    if (!user) {
      return next(new AppError(HttpStatus.UNAUTHORIZED, invalidTokenOrSession));
    }

    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
