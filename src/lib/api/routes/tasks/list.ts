import qs from 'qs';

import { getTasks } from '@/lib/api/db/tasks';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { UserRole } from '@/lib/models/user';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { Task, TaskListDBParams, TaskListDBRes } from '@/lib/models/task';
import type { Pagination } from '@/lib/api/redis/types';
import type { SignJWTPayload } from '@/lib/api/utils/jwt';

export type TasksListReq = NextReqWithAuth & NextReqWithQueryIds<['assignee', 'owner']> & {
    query: TaskListDBParams;
};

export type TasksListRes = TaskListDBRes;

const filterByRole = (authUser: SignJWTPayload, filter: Pagination<Task>['filter']): Pagination<Task>['filter'] => {
    if (authUser.role === UserRole.ASSIGNEE) {
        return {
            ...filter,
            assignee: authUser.username,
        };
    }

    if (authUser.role === UserRole.REPORTER) {
        return {
            ...filter,
            reporter: authUser.username,
        };
    }

    return {};
};

const listTasksAPIHandler = async (req: TasksListReq, res: Res<TasksListRes>): Promise<void> => {
    try {
        const { auth } = req;

        const queryData = qs.parse(req.query as Record<string, string>) as TaskListDBParams;

        const params: Pagination<Task> = {
            ...queryData,
            filter: filterByRole(auth, queryData.filter),
        };

        const tasks = await getTasks(params);

        res.status(200).json(tasks);
    } catch (e) {
        handleApiError(e, res);
    }
};

export const listTasksAPI = withMiddleware(
    authRateLimit(checkAuth()),
    listTasksAPIHandler,
);
