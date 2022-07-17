import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getCountStats } from 'lib/api/db/stats';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';

export type CountStatsReq = NextReqWithQueryIds<['owner']>;
export type CountStatsRes = number;

const countStatsAPI = async (req: CountStatsReq, res: Res<CountStatsRes>): Promise<void> => {
    try {
        const { owner } = req.query;

        const count = await getCountStats(owner);

        res.status(200).json(count);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    countStatsAPI,
);
