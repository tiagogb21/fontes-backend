import config from 'config';
import { CookieOptions } from 'express';

import { cookiesOptions, SECOND, THOUSAND } from '../data/constants';

export const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * SECOND * THOUSAND
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * SECOND * THOUSAND,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * SECOND * THOUSAND
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * SECOND * THOUSAND,
};
