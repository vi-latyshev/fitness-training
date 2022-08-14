import { attach } from 'redis-filtered-sort';
import Redis from 'ioredis';

import type { RedisWithFsort } from './types';

const redisInstance = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);

        return delay;
    },
});

attach(redisInstance, 'fsort');

export const redis = redisInstance as RedisWithFsort;
