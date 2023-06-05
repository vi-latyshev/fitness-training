import { removeTask } from '@/lib/api/db/tasks';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { handleApiError } from '@/lib/api/error/handle-api-error';

import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { NextApiResponse as Res } from 'next';

export type RemoveTaskReq = NextReqWithAuth & NextReqWithQueryIds<['taskId']>;
export type RemoveTaskRes = void;

const removeTaskAPIHandler = async (req: RemoveTaskReq, res: Res<RemoveTaskRes>): Promise<void> => {
    try {
        const { taskId } = req.query;

        await removeTask(taskId);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export const removeTaskAPI = withMiddleware(
    verifyQueryId<['taskId']>(['taskId']),
    authRateLimit(checkAuth()),
    removeTaskAPIHandler,
);
