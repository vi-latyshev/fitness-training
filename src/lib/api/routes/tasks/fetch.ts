import { getTask } from '@/lib/api/db/tasks';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { Task } from '@/lib/models/task';

export type FetchTaskReq = NextReqWithAuth & NextReqWithQueryIds<['taskId']>;
export type FetchTaskRes = Task;

const fetchTaskAPIHandler = async (req: FetchTaskReq, res: Res<FetchTaskRes>): Promise<void> => {
    try {
        const { query } = req;
        const { taskId } = query;

        const task = await getTask(taskId);

        res.status(200).json(task);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const fetchTaskAPI = withMiddleware(
    verifyQueryId<['taskId']>(['taskId']),
    authRateLimit(checkAuth()),
    fetchTaskAPIHandler,
);
