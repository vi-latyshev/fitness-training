import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { verifyQueryId } from '@/lib/api/middleware/plugins/check-query-id';
import { authRateLimit } from '@/lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from '@/lib/api/middleware/plugins/check-auth';
import { handleApiError } from '@/lib/api/error/handle-api-error';
import { UserRole } from '@/lib/models/user';
import { APIError } from '@/lib/api/error';
import { removeUser } from '@/lib/api/db/users';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from '@/lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from '@/lib/api/middleware/plugins/check-auth';

export type RemoveUserReq = NextReqWithAuth & NextReqWithQueryIds<['username']>;
export type RemoveUserRes = void;

const removeUserAPI = async (req: RemoveUserReq, res: Res<RemoveUserRes>) => {
    try {
        const { username } = req.query;
        const { auth } = req;

        // only for admin
        if (auth?.role !== UserRole.ADMIN) {
            throw new APIError('Not enough rights', 403);
        }
        // @TODO remove assignee tasks of user
        await removeUser(username);

        res.status(204).end();
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['username']>(['username']),
    authRateLimit(checkAuth()),
    removeUserAPI,
);
