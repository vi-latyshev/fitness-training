import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getUsers } from 'lib/api/db/users';
import { UserRole } from 'lib/models/user';
import { APIError } from 'lib/api/error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { ListUsersDBParams, ListUsersDBRes } from 'lib/api/db/users';

export type ListUsersRes = ListUsersDBRes;

type HandlesByRole = {
    [Role in UserRole]?: () => Promise<ListUsersRes>;
};

const handlesByRole: HandlesByRole = {
    [UserRole.ADMIN]: async () => getUsers(),
    [UserRole.COACH]: async () => {
        const params: ListUsersDBParams = {
            filter: {
                role: UserRole.TRAINEE,
            },
        };

        return getUsers(params);
    },
};

const listUsersAPI = async (req: NextReqWithAuth, res: Res<ListUsersRes>): Promise<void> => {
    try {
        const { role } = req.auth;

        const handle = handlesByRole[role];
        if (!handle) {
            throw new APIError('Not enough rights', 403);
        }
        const data = await handle();

        res.status(200).json(data);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    checkAuth,
    listUsersAPI,
);
