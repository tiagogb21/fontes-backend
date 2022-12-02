import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/Errors/AppError';
import HttpStatus from 'http-status-codes';
import { sessionExpired } from '../utils/data/constants';

export const requireUser = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return next(
        new AppError(HttpStatus.BAD_REQUEST, sessionExpired)
      );
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
