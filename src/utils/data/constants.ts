import { CookieOptions } from "express";

export const redisUrl = 'redis://localhost:6379';

export const limit = "10kb";

export const redisSuccessfullyConnected = 'Redis client connect successfully';

export const welcomeMessage = 'Welcome to Express with TypeORM';

export const MAX_TIME = 5000;

export const SECOND = 60;

export const THOUSAND = 1000;

export const FAIL = '23505';

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

export const invalidTokenOrSession = `Invalid token or session, this has expired`;

export const notLoggedIn = 'You are not logged in';

export const invalidToken = `Invalid token or user doesn't exist`

export const sessionExpired = `Session has expired or user doesn't exist`
