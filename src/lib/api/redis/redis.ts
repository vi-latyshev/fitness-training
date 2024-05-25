import Redis from 'ioredis';
import { attach } from 'redis-filtered-sort';

import type { RedisWithFsort } from './types';

const redisInstance = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 10,
    retryStrategy(times) {
        if (times > 10) {
            return null;
        }
        const delay = Math.min(times * 50, 2000);

        return delay;
    },
});

attach(redisInstance, 'fsort');

export const redis = redisInstance as RedisWithFsort;
