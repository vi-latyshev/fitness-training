import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { getUser } from 'lib/api/db/users';
import { handleApiError } from 'lib/api/error/handle-api-error';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryId } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { User } from 'lib/models/user';

type FetchUserReq = NextReqWithAuth & NextReqWithQueryId;
export type FetchUserRes = User;

const responseUser = async (res: Res<FetchUserRes>, username: string) => {
    const user = await getUser(username);

    res.setHeader('Cache-Control', 'max-age=59, s-maxage=60');
    res.status(200).json(user);
};

const fetchUserAPI = async (req: FetchUserReq, res: Res<FetchUserRes>): Promise<void> => {
    try {
        const { id: username } = req.query;

        if (username === 'me') {
            await responseUser(res, req.auth.username);

            return;
        }
        await responseUser(res, username);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    fetchUserAPI,
);
