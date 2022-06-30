import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getUsers } from 'lib/api/db/users';
import { UserRole } from 'lib/models/user';
import { APIError } from 'lib/api/error';

import type { NextApiRequest, NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { ListUsersDBParams, ListUsersDBRes } from 'lib/api/db/users';

type ListUsersReq = NextReqWithAuth & {
    query: NextApiRequest['query'] & ListUsersDBParams;
};

export type ListUsersRes = ListUsersDBRes;

type RightsByRole = {
    [Role in UserRole]?: ListUsersDBParams;
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
        const params: ListUsersDBParams = {
            ...req.query,
            ...rightsOpts,
            filter: {
                ...req.query.filter,
                ...rightsOpts.filter,
            },
        };
        const data = await getUsers(params);

        res.setHeader('Cache-Control', 'max-age=59, s-maxage=60');
        res.status(200).json(data);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkAuth,
    listUsersAPI,
);
