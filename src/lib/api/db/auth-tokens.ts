import {
    redis,
    handlePipeline,
    AUTH_TOKENS_KEY,
} from '../redis';

export const saveAuthToken = async (token: string, expireSec: number): Promise<void> => {
    const pipe = redis.pipeline();

    const authTokenKey = AUTH_TOKENS_KEY(token);

    pipe.set(authTokenKey, Date.now());
    pipe.expire(authTokenKey, expireSec);

    handlePipeline(await pipe.exec());
};

export const checkAuthToken = async (token: string): Promise<boolean> => {
    const isHasAuthToken = await redis.exists(AUTH_TOKENS_KEY(token));

    return Boolean(isHasAuthToken);
};

export const removeAuthToken = async (token: string): Promise<void> => {
    await redis.del(AUTH_TOKENS_KEY(token));
};
