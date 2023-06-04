import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import fetchUserAPI from '@/lib/api/routes/users/fetch';
import removeUserAPI from '@/lib/api/routes/users/remove';

import type { NextApiResponse } from 'next';
import type { FetchUserReq, FetchUserRes } from '@/lib/api/routes/users/fetch';
import type { RemoveUserRes } from '@/lib/api/routes/users/remove';

const user = async (
    req: FetchUserReq,
    res: NextApiResponse<FetchUserRes | RemoveUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchUserAPI(req, res);
            break;
        case 'DELETE':
            await removeUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'DELETE']),
    user,
);
