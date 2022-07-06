import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import fetchUserAPI from 'lib/api/routes/users/fetch';

import type { NextApiResponse } from 'next';
import type { FetchUserReq, FetchUserRes } from 'lib/api/routes/users/fetch';

const user = async (
    req: FetchUserReq,
    res: NextApiResponse<FetchUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    verifyQueryId<['username']>(['username']),
    checkAuth,
    user,
);
