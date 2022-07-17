import { withMiddleware } from 'lib/api/middleware/with-middlewares';
import { verifyQueryId } from 'lib/api/middleware/plugins/check-query-id';
import { checkAuth } from 'lib/api/middleware/plugins/check-auth';
import { checkBody } from 'lib/api/middleware/plugins/check-body';
import { handleApiError } from 'lib/api/error/handle-api-error';
import { APIError } from 'lib/api/error';

import { statsTypeList } from 'lib/models/stats';
import { createStats } from 'lib/api/db/stats';

import type { NextApiResponse as Res } from 'next';
import type { NextReqWithQueryIds } from 'lib/api/middleware/plugins/check-query-id';
import type { NextReqWithAuth } from 'lib/api/middleware/plugins/check-auth';
import type { NextReqWithBody, Validator } from 'lib/api/middleware/plugins/check-body';
import type {
    Stats,
    StatsType,
    StatsCreateData,
    StatsCreateDataDB,
} from 'lib/models/stats';

// @TODO create type with generic as Query & Body
export type CreateStatsReq = Omit<NextReqWithAuth & NextReqWithQueryIds<['owner']>, 'body'> & NextReqWithBody<StatsCreateData>;
export type CreateStatsRes = Stats;

const validateBody: Validator<StatsCreateData> = (props): boolean => (
    Object.entries(props).every(([key, value]) => (
        statsTypeList.includes(key as StatsType)
        && typeof value === 'number' && value > 0
    ))
);

const createStatsAPI = async (req: CreateStatsReq, res: Res<CreateStatsRes>): Promise<void> => {
    try {
        const { auth, body, query } = req;
        const { owner } = query;

        // can create workout only coach
        if (owner !== auth.username) {
            throw new APIError('Not enough rights', 403);
        }
        const workoutCreate: StatsCreateDataDB = {
            ...body,
            owner,
            createdAt: Date.now(),
        };

        const workout = await createStats(workoutCreate);

        res.status(200).json(workout);
    } catch (e) {
        handleApiError(e, res);
    }
};

export default withMiddleware(
    verifyQueryId<['owner']>(['owner']),
    checkAuth(),
    checkBody(validateBody),
    createStatsAPI,
);
