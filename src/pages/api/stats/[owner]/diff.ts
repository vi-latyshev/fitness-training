import { allowMethods } from 'lib/api/middleware/plugins/allow-methods';
import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import fetchDiffStatsAPI from 'lib/api/routes/stats/diff';

import type { NextApiResponse } from 'next';
import type { FetchDiffStatsReq, FetchDiffStatsRes } from 'lib/api/routes/stats/diff';

const diff = async (
    req: FetchDiffStatsReq,
    res: NextApiResponse<FetchDiffStatsRes>,
): Promise<void> => {
    const { method } = req;

    switch (method) {
        case 'GET':
            await fetchDiffStatsAPI(req, res);
            break;
        default: break;
    }
};

export default withMiddleware(
    allowMethods(['GET']),
    diff,
);
