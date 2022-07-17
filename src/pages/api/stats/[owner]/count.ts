import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import countStatsAPI from 'lib/api/routes/stats/count';

import type { NextApiResponse } from 'next';
import type { CountStatsReq, CountStatsRes } from 'lib/api/routes/stats/count';

const countStats = async (
    req: CountStatsReq,
    res: NextApiResponse<CountStatsRes>
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await countStatsAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    countStats,
);
