import { createClient } from 'redis';
import {
  MAX_TIME,
  redisSuccessfullyConnected,
  redisUrl,
  welcomeMessage
} from '../data/constants';

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log(redisSuccessfullyConnected);
    redisClient.set('try', welcomeMessage);
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, MAX_TIME);
  }
};

connectRedis();

export default redisClient;
