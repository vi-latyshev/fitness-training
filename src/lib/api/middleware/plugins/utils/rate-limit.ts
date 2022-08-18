import { incrementRateLimit } from 'lib/api/db/rate-limit';
import { APIError } from 'lib/api/error';

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';

interface RateLimitContextBase {
    type: string;
    id: string;
    limit: number;
    timeframe: number;
    count?: RateLimitCountFn;
}

interface RateLimitContext extends RateLimitContextBase {
    req: Req;
    res: Res;
}

type RateLimitHandler<R extends Req = Req> = (
    req: R,
    res: Res,
) => Promise<RateLimitContextBase | void> | RateLimitContextBase | void;

export type RateLimitHeaderErrors = Pick<RateLimitContextBase, 'limit'> & {
    remaining: number;
    reset: number;
};

export type RateLimitCountFn = (
    context: RateLimitContext & { key: string; },
) => Promise<number>;

type RateLimitRet<R extends Req = Req> = (req: R, res: Res) => Promise<void>;

const setRateLimitHeaders = (res: Res, headersVals: RateLimitHeaderErrors) => {
    const {
        limit,
        remaining,
        reset,
    } = headersVals;

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(remaining, 0));
    res.setHeader('X-RateLimit-Reset', reset);
};

const increment: RateLimitCountFn = async ({ type, key, timeframe }) => {
    const count = await incrementRateLimit(type, key, timeframe);

    return count;
};

/* eslint-disable max-len */
/**
 * Inspired by Next.JS Rate-limit
 *
 * @see https://github.com/vercel/examples/blob/7ec7e3ec4db0e35f46cfdeb2f4f021e0fb67b50e/edge-functions/api-rate-limit-and-tokens/lib/rate-limit.ts
 */
/* eslint-enable max-len */
export const initRateLimit = <R extends Req>(fn: RateLimitHandler<R>): RateLimitRet<R> => (
    async (req, res) => {
        const ctx = await fn(req, res);

        if (!ctx) {
            return;
        }
        const {
            type,
            id,
            limit,
            timeframe,
            count = increment,
        } = ctx;

        const time = Math.floor(Date.now() / 1000 / timeframe);
        const key = `${id}:${time}`;
        let countReq: number;

        try {
            countReq = await count({
                ...ctx, key, req, res,
            });
        } catch (err) {
            /**
             * @TODO add Sentry or smth else
             */
            console.error('Rate limit `count` failed with:', err); // eslint-disable-line no-console

            return;
        }
        const remaining = Math.max((limit + 1) - countReq, 0);
        const reset = (time + 1) * timeframe;

        const headersVals: RateLimitHeaderErrors = {
            limit,
            remaining,
            reset,
        };
        setRateLimitHeaders(res, headersVals);

        if (remaining <= 0) {
            throw new APIError(`API rate limit exceeded for ${type} - ${id}`, 429, headersVals);
        }
    }
);
