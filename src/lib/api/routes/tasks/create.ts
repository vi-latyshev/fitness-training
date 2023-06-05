import { createTask } from '@/lib/api/db/tasks';
import { APIError } from '@/lib/api/error';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { checkBody } from '@/lib/api/middleware/plugins/check-body';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { taskStatusTypeList } from '@/lib/models/task';
import { UserRole } from '@/lib/models/user';
import { getUserId } from '@/lib/api/db/users';

import type { Task, TaskCreateData, TaskCreateDataDB } from '@/lib/models/task';
import type { NextReqWithBody, Validator } from '@/lib/api/middleware/plugins/check-body';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { NextApiResponse as Res } from 'next';

export type CreateTaskReq = Omit<NextReqWithAuth, 'body'> & NextReqWithBody<TaskCreateData>;
export type CreateTaskRes = Task;

const validateBody: Validator<TaskCreateData> = ({
    title,
    description,
    dueDate,
    status,
    assignee,
    ...rest
}): boolean => (
    title !== undefined && typeof title === 'string' && /^[а-яА-Я\s]{3,30}/.test(title)
    && (description === undefined || (typeof description === 'string' && (description.length === 0 || /^[а-яА-Я\s]{1,250}/.test(description))))
    && (dueDate === undefined || (typeof dueDate === 'number' && dueDate > 0))
    && (status !== undefined && taskStatusTypeList.includes(status))
    && (typeof assignee === 'string' && /^[a-z.0-9_]{5,15}/.test(assignee))
    && Object.keys(rest).length === 0
);

const createTaskAPIHandler = async (req: CreateTaskReq, res: Res<CreateTaskRes>): Promise<void> => {
    try {
        const { auth, body } = req;

        // can create task only reporter
        if (auth.role !== UserRole.REPORTER) {
            throw new APIError('Not enough rights', 403);
        }
        const assigneeUserId = await getUserId(body.assignee);

        if (!assigneeUserId) {
            return;
        }

        const taskCreate: TaskCreateDataDB = {
            ...body,
            reporter: auth.username,
            createdAt: Date.now(),
        };

        const task = await createTask(taskCreate);

        res.status(200).json(task);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const createTaskAPI = withMiddleware(
    authRateLimit(checkAuth()),
    checkBody(validateBody),
    createTaskAPIHandler,
);
