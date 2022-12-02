import config from 'config';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import redisClient from '../utils/redis/connectRedis';
import { AppDataSource } from '../data-source';
import { signJwt } from '../utils/jwt/jwt';
import { SECOND } from '../utils/data/constants';

const userRepository = AppDataSource.getRepository(User);

export class UserService {
  createUser(input: DeepPartial<User>) {
    return userRepository.save(userRepository.create(input));
  };

  async findUserById(userId: string) {
    return await userRepository.findOneBy({ id: userId });
  };

  async findUser(username: string) {
    return await userRepository.findOneBy({ username });
  };

  async signTokens(user: User) {
    await redisClient.set(user.id, JSON.stringify(user), {
      EX: config.get<number>('redisCacheExpiresIn') * SECOND,
    });

    const access_token = signJwt({ userId: user.id, username: user.username }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    const refresh_token = signJwt({ userId: user.id, username: user.username }, 'refreshTokenPrivateKey', {
      expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    });

    console.log(access_token)
    console.log(refresh_token)

    return { access_token, refresh_token };
  };
}
