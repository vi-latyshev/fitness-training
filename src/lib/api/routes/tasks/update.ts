import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { taskStatusTypeList } from '@/lib/models/task';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { updateTask } from '@/lib/api/db/tasks';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkBody } from '@/lib/api/middleware/plugins/check-body';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { getUserId } from '@/lib/api/db/users';

import type { NextApiResponse as Res } from 'next';
import type { Validator, NextReqWithBody } from '@/lib/api/middleware/plugins/check-body';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { TaskCreateData, TaskUpdateData } from '@/lib/models/task';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';

export type UpdateTaskReq = Omit<NextReqWithAuth & NextReqWithQueryIds<['taskId']>, 'body'> & NextReqWithBody<TaskUpdateData>;
export type UpdateTaskRes = void;

const validateBody: Validator<TaskCreateData> = ({
    title,
    description,
    dueDate,
    status,
    assignee,
    ...rest
}): boolean => (
    (title === undefined || (title !== undefined && typeof title === 'string' && /^[а-яА-Я\s]{3,30}/.test(title)))
    && (description === undefined || (typeof description === 'string' && (description.length === 0 || /^[а-яА-Я\s]{1,250}/.test(description))))
    && (dueDate === undefined || (typeof dueDate === 'number' && dueDate > 0))
    && (status === undefined || (status !== undefined && taskStatusTypeList.includes(status)))
    && (assignee === undefined || (typeof assignee === 'string' && (assignee.length === 0 || /^[a-z.0-9_]{5,15}/.test(assignee))))
    && Object.keys(rest).length === 0
);

const updateTaskAPIHandler = async (req: UpdateTaskReq, res: Res<UpdateTaskRes>): Promise<void> => {
    try {
        const { body, query } = req;
        const { taskId } = query;

        const taskUpdate: TaskUpdateData = body;

        if (body.assignee && body.assignee.length > 0) {
            const assigneeUserId = await getUserId(body.assignee);

            if (!assigneeUserId) {
                return;
            }
        }
        await updateTask(taskId, taskUpdate);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export const updateTaskAPI = withMiddleware(
    verifyQueryId<['taskId']>(['taskId']),
    authRateLimit(checkAuth()),
    checkBody(validateBody),
    updateTaskAPIHandler,
);
