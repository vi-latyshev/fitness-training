import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { checkAuth, NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import fetchUserAPI from 'lib/api/routes/users/fetch';

import type { NextApiResponse } from 'next';
import type { NextReqWithQueryId } from 'lib/api/middleware/plugins/check-query-id';
import type { FetchUserRes } from 'lib/api/routes/users/fetch';

const user = async (
    req: NextReqWithQueryId & NextReqWithAuth,
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
    verifyQueryId,
    checkAuth,
    user,
);
