import { attach } from 'redis-filtered-sort';
import Redis from 'ioredis';

import type { RedisWithFsort } from './types';

const redisInstance = new Redis(process.env.REDIS_URL);

attach(redisInstance, 'fsort');

export const redis = redisInstance as RedisWithFsort;
