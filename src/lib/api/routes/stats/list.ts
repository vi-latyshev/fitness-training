import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { getStatsList } from 'lib/api/db/stats';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { ListStatsDBParams, ListStatsDBRes } from 'lib/models/stats';

export type ListStatsReq = NextReqWithQueryIds<['owner']> & {
    query: ListStatsDBParams;
};

export type ListStatsRes = ListStatsDBRes;

const listStatsAPI = async (req: ListStatsReq, res: Res<ListStatsRes>): Promise<void> => {
    try {
        const { owner, ...params } = req.query;

        const stats = await getStatsList(owner, params);

        res.status(200).json(stats);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    ipRateLimit,
    listStatsAPI,
);
