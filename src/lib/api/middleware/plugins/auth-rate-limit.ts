import { initRateLimit } from './utils/rate-limit';
import { ipRateLimit } from './ip-rate-limit';

import type { Middleware } from '../with-middlewares';
import type { checkAuth, NextReqWithAuth } from './check-auth';

// limit / timeframe = rps
const AUTH_DEFAUL_LIMIT = 5000;
const AUTH_DEFAUL_TIMEFRAME = 5;

export const authRateLimit = (authFn: ReturnType<typeof checkAuth>): Middleware<NextReqWithAuth> => (
    initRateLimit<NextReqWithAuth>(async (req, res) => {
        try {
            await authFn(req, res);
        } catch (e) {
            await ipRateLimit(req, res);

            throw e;
        }
        const { auth, authToken } = req;

        if (!auth) {
            await ipRateLimit(req, res);

            return undefined;
        }
        const { apiLimit, apiTimeframe } = auth;

        return {
            type: 'auth',
            id: authToken,
            limit: apiLimit ?? AUTH_DEFAUL_LIMIT,
            timeframe: apiTimeframe ?? AUTH_DEFAUL_TIMEFRAME,
        };
    })
);
