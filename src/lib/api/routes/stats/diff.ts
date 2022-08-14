import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { ipRateLimit } from 'lib/api/middleware/plugins/ip-rate-limit';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { handleApiError } from 'lib/api/error/handle-api-error';

import { getDiffStats } from 'lib/api/db/stats';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { DiffStatsData } from 'lib/models/stats';

export type FetchDiffStatsReq = NextReqWithAuth & NextReqWithQueryIds<['owner']>;
export type FetchDiffStatsRes = DiffStatsData;

const fetchDiffStatsAPI = async (req: FetchDiffStatsReq, res: Res<DiffStatsData>): Promise<void> => {
    try {
        const { owner } = req.query;

        const diff = await getDiffStats(owner);

        res.status(200).json(diff);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    ipRateLimit,
    checkAuth(),
    fetchDiffStatsAPI,
);
