import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import createStatsAPI from 'lib/api/routes/stats/create';
import listStatsAPI from 'lib/api/routes/stats/list';

import type { NextApiResponse } from 'next';
import type { CreateStatsReq, CreateStatsRes } from 'lib/api/routes/stats/create';
import type { ListStatsReq, ListStatsRes } from 'lib/api/routes/stats/list';

const stats = async (
    req: CreateStatsReq | ListStatsReq,
    res: NextApiResponse<CreateStatsRes | ListStatsRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await listStatsAPI(req, res);
            break;
        case 'POST':
            await createStatsAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET', 'POST']),
    stats,
);
