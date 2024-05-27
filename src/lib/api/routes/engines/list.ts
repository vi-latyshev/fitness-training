import qs from 'qs';

import { getEngines } from '@/lib/api/db/engine';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { Engine, EngineListDBParams, EngineListDBRes } from '@/lib/models/engine';
import type { Pagination } from '@/lib/api/redis/types';

export type EngineListReq = NextReqWithAuth & NextReqWithQueryIds<['filter']> & {
    query: EngineListDBParams;
};

export type EnginesListRes = EngineListDBRes;

const listEnginesAPIHandler = async (req: EngineListReq, res: Res<EnginesListRes>): Promise<void> => {
    try {
        const queryData = qs.parse(req.query as Record<string, string>) as EngineListDBParams;

        const params: Pagination<Engine> = {
            ...queryData,
        };

        const engines = await getEngines(params);

        res.status(200).json(engines);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const listEnginesAPI = withMiddleware(
    authRateLimit(checkAuth()),
    listEnginesAPIHandler,
);
