import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getUsers } from 'lib/api/db/users';
import { UserRole } from 'lib/models/user';
import { APIError } from 'lib/api/error';

import type { NextApiRequest, NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { User } from 'lib/models/user';
import type { Pagination, PaginationResp } from 'lib/api/redis/types';

type ListUsersReq = NextReqWithAuth & {
    query: NextApiRequest['query'] & Pagination<User>;
};

export type ListUsersRes = PaginationResp<User>;

type RightsByRole = {
    [Role in UserRole]?: Pagination<User>;
};

const rightsByRole: RightsByRole = {
    [UserRole.ADMIN]: {},
    [UserRole.COACH]: {
        filter: {
            role: UserRole.TRAINEE,
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
        const params: Pagination<User> = {
            ...req.query,
            ...rightsOpts,
            filter: {
                ...req.query.filter,
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
    ipRateLimit,
    checkAuth(),
    listUsersAPI,
);
