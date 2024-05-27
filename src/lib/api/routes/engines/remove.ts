import { deleteEngine } from '@/lib/api/db/engine';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { handleApiError } from '@/lib/api/error/handle-api-error';

import type { EngineId } from '@/lib/models/engine';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { NextApiResponse as Res } from 'next';

export type RemoveEngineReq = NextReqWithAuth & NextReqWithQueryIds<['engineId']>;
export type RemoveEngineRes = void;

const removeEngineAPIHandler = async (req: RemoveEngineReq, res: Res<RemoveEngineRes>): Promise<void> => {
    try {
        const { engineId } = req.query;

        await deleteEngine(engineId as EngineId);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export const removeEnginesAPI = withMiddleware(
    verifyQueryId<['engineId']>(['engineId']),
    authRateLimit(checkAuth()),
    removeEngineAPIHandler,
);
