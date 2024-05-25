import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { authRateLimit } from 'lib/api/middleware/plugins/auth-rate-limit';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';

import { getUser } from 'lib/api/db/users';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { User } from 'lib/models/user';

export type FetchUserReq = NextReqWithAuth & NextReqWithQueryIds<['username']>;
export type FetchUserRes = User;

const fetchUserAPI = async (req: FetchUserReq, res: Res<FetchUserRes>): Promise<void> => {
    try {
        const { username: owner } = req.query;

        const username = owner === 'me'
            ? req.auth.username
            : owner;

        const user = await getUser(username);

        res.status(200).json(user);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['username']>(['username']),
    authRateLimit(checkAuth()),
    fetchUserAPI,
);
