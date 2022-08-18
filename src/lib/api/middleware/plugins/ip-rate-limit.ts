import { getReqIP } from 'lib/api/utils/ip';

import { initRateLimit } from './utils/rate-limit';

import type { Middleware } from '../with-middlewares';

// limit / timeframe = rps
const IP_DEFAUL_LIMIT = 10;
const IP_DEFAUL_TIMEFRAME = 5;

export const ipRateLimit: Middleware = initRateLimit((req) => ({
    type: 'ip',
    id: getReqIP(req),
    limit: IP_DEFAUL_LIMIT,
    timeframe: IP_DEFAUL_TIMEFRAME,
}));
