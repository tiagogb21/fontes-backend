import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import AppError from '../utils/Errors/AppError';
import redisClient from '../utils/redis/connectRedis';
import { User } from '../entities/user.entity';
import { cookiesOptions, FAIL } from '../utils/data/constants';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from '../utils/token';

const userService = new UserService();

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

export class UserController {
  async registerUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, password, username } = req.body;

      const verifyUser = await userService.findUser(username)

      if(verifyUser) {
        return res.status(HttpStatus.CONFLICT).json({message: 'A user with that username already exist!'})
      }

      const user = await userService.createUser({
        name,
        username,
        password,
      });

      const {
        password: userPassword,
        ...userInfo
      } = user

      res.status(HttpStatus.CREATED).json({
        status: 'success',
        userInfo,
      });
    } catch (err: any) {
      if (err.code === FAIL) {
        return res.status(HttpStatus.CONFLICT).json({
          status: 'fail',
          message: 'User with that username already exist',
        });
      }
      next(err);
    }
  };

  async loginUserHandler(
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
  ) {
      const { username, password } = req.body;

      console.log(1111)

      const user = await userService.findUser(username);

      const passwordVerify = await User.comparePasswords(password, user?.password!);

      if (!user || !passwordVerify) {
        return next(new AppError(HttpStatus.BAD_REQUEST, 'Invalid username or password'));
      }

      console.log(1111111)

      const { access_token, refresh_token } = await userService.signTokens(user);

      console.log(access_token)

      res.cookie('access_token', access_token, accessTokenCookieOptions);
      res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return res.status(200).json({
        status: 'success',
        access_token,
      });
  };

  logout(_req: Request, res: Response) {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
  };

  async logoutHandler(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
      const user = res.locals.user;

      await redisClient.del(user.id);

      this.logout(req, res);

      res.status(HttpStatus.OK).json({
        status: 'success',
      });
  };
}
