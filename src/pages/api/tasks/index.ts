import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import { createTaskAPI } from '@/lib/api/routes/tasks/create';
import { listTasksAPI } from '@/lib/api/routes/tasks/list';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';

import type { NextApiResponse } from 'next';
import type { TasksListReq, TasksListRes } from '@/lib/api/routes/tasks/list';
import type { CreateTaskReq, CreateTaskRes } from '@/lib/api/routes/tasks/create';

const tasks = async (
    req: CreateTaskReq | TasksListReq,
    res: NextApiResponse<CreateTaskRes | TasksListRes>
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listTasksAPI(req, res);
            break;
        case 'POST':
            await createTaskAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'POST']),
    tasks,
);
