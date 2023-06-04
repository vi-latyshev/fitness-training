import {
    redis,
    handlePipeline,
    RATE_LIMIT_TYPE_KEY,
} from '@/lib/api/redis';

export const incrementRateLimit = async (type: string, key: string, expireSec: number): Promise<number> => {
    const pipe = redis.pipeline();

    const rateLimitKey = RATE_LIMIT_TYPE_KEY(type, key);

    pipe.incr(rateLimitKey);
    pipe.expire(rateLimitKey, expireSec);

    const [count] = handlePipeline(await pipe.exec()) as [number, boolean];

    return count;
};
