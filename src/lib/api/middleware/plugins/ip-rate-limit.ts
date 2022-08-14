import { incrementRateLimit } from 'lib/api/db/rate-limit';
import { getReqIP } from 'lib/api/utils/ip';

import { initRateLimit } from './utils/rate-limit';

import type { Middleware } from '../with-middlewares';
import type { RateLimitCountFn } from './utils/rate-limit';

const increment: RateLimitCountFn = async ({ type, key, timeframe }) => {
    const count = await incrementRateLimit(type, key, timeframe);

    return count;
};

export const ipRateLimit: Middleware = initRateLimit((request) => ({
    type: 'ip',
    id: getReqIP(request),
    count: increment,
    // 50 req / 5 sec = 10rps
    limit: 5,
    timeframe: 5,
}));
