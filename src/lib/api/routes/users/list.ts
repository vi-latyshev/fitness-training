import qs from 'qs';

import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { getUsers } from '@/lib/api/db/users';
import { UserRole } from '@/lib/models/user';
import { APIError } from '@/lib/api/error';

import type { NextApiRequest, NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';
import type { User } from '@/lib/models/user';
import type { Pagination, PaginationResp } from '@/lib/api/redis/types';

type ListUsersReq = NextReqWithAuth & {
    query: NextApiRequest['query'] & Pagination<User>;
};

export type ListUsersRes = PaginationResp<User>;

type RightsByRole = {
    [Role in UserRole]?: Pagination<User>;
};

const rightsByRole: RightsByRole = {
    [UserRole.ADMIN]: {},
    [UserRole.REPORTER]: {
        filter: {
            role: UserRole.ASSIGNEE,
        },
    },
};

const listUsersAPI = async (req: ListUsersReq, res: Res<ListUsersRes>): Promise<void> => {
    try {
        const { role } = req.auth;
        const rightsOpts = rightsByRole[role];

        if (!rightsOpts) {
            throw new APIError('Not enough rights', 403);
        }
        const queryData = qs.parse(req.query as Record<string, string>) as NextApiRequest['query'] & Pagination<User>;

        const params: Pagination<User> = {
            ...queryData,
            ...rightsOpts,
            filter: {
                ...queryData.filter,
                ...rightsOpts.filter,
            },
        };
        const data = await getUsers(params);

        res.status(200).json(data);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    authRateLimit(checkAuth()),
    listUsersAPI,
);
