import { getEngine } from '@/lib/api/db/engine';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { Engine, EngineId } from '@/lib/models/engine';

export type FetchEngineReq = NextReqWithAuth & NextReqWithQueryIds<['engineId']>;
export type FetchEngineRes = Engine;

const fetchEngineAPIHandler = async (req: FetchEngineReq, res: Res<FetchEngineRes>): Promise<void> => {
    try {
        const { query } = req;
        const { engineId } = query;

        const engine = await getEngine(engineId as EngineId);

        res.status(200).json(engine);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const fetchEnginesAPI = withMiddleware(
    verifyQueryId<['engineId']>(['engineId']),
    authRateLimit(checkAuth()),
    fetchEngineAPIHandler,
);
