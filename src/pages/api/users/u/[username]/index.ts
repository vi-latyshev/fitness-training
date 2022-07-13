import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
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
    user,
);
