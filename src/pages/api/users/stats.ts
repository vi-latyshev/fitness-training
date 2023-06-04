import { withMiddleware } from '@/lib/api/middleware/with-middlewares';
import { allowMethods } from '@/lib/api/middleware/plugins/allow-methods';
import fetchFullStatsUserAPI from '@/lib/api/routes/users/stats';

import type { NextApiResponse } from 'next';
import type { FetchFullStatsUserReq, FetchFullStatsUserRes } from '@/lib/api/routes/users/stats';

const userStats = async (
    req: FetchFullStatsUserReq,
    res: NextApiResponse<FetchFullStatsUserRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchFullStatsUserAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    userStats,
);
