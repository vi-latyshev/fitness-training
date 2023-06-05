import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { fetchTaskAPI } from '@/lib/api/routes/tasks/fetch';
import { removeTaskAPI } from '@/lib/api/routes/tasks/remove';
import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { updateTaskAPI } from '@/lib/api/routes/tasks/update';

import type { NextApiResponse } from 'next';
import type { UpdateTaskReq, UpdateTaskRes } from '@/lib/api/routes/tasks/update';
import type { FetchTaskReq, FetchTaskRes } from '@/lib/api/routes/tasks/fetch';
import type { RemoveTaskReq, RemoveTaskRes } from '@/lib/api/routes/tasks/remove';

const task = async (
    req: FetchTaskReq | UpdateTaskReq | RemoveTaskReq,
    res: NextApiResponse<FetchTaskRes | UpdateTaskRes | RemoveTaskRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchTaskAPI(req, res);
            break;
        case 'PATCH':
            await updateTaskAPI(req, res);
            break;
        case 'DELETE':
            await removeTaskAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'PATCH', 'DELETE']),
    task,
);
